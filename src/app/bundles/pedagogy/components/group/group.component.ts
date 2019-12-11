import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {ClassroomModel} from '../../models/classroom.model';
import {PedagogyService} from '../../services/pedagogy.service';
import {GroupModel} from '../../models/group.model';
import {DialogComponent} from '../../../../commons/dialog/dialog.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  subscription: Subscription;
  groups: any;
  classrooms: ClassroomModel[];
  groupForm: FormGroup;
  groupFormEdit: FormGroup;
  showFormAdd: boolean;
  isEdit: boolean;
  pageIndex: number;
  pageSize: number;
  length: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['label', 'classroomId', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  pageEvent: PageEvent;
  constructor(private formBuilder: FormBuilder,
              private pedagogyService: PedagogyService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isEdit = false;
    this.loadGroups();
    this.initForm();
    this.initEditForm();
    this.loadClassrooms();
  }

  showForm() {
    this.showFormAdd = true;
  }

  /**
   * Show the form add
   */
  getShowForm() {
    return this.showFormAdd;
  }

  /**
   * Load classrooms list
   */
  loadClassrooms() {
    this.subscription = this.pedagogyService.classrooms$.subscribe((data) => {
      this.classrooms = data;
    });
  }

  /**
   * Load the groups list
   */
  loadGroups() {
    this.subscription = this.pedagogyService.groups$.subscribe((data) => {
      this.groups = new MatTableDataSource<GroupModel>(data.groupModels);
      this.pageSize = 20;
      this.length = data.length;
      this.pageIndex = 1;
      this.groups.sort = this.sort;
      this.groups.paginator = this.paginator;
    });
  }

  /**
   * Initialisation of the group form
   */
  initForm() {
    this.groupForm = this.formBuilder.group({
      label: ['', Validators.required],
      classroomId: [this.classrooms, Validators.required],
    });
  }

  /**
   * Form add submit
   */
  onSubmitForm() {
    const formValue = this.groupForm.value;
    const newGroup = new GroupModel();
    newGroup.label = formValue.label;
    newGroup.classroomId = formValue.classroomId;
    this.pedagogyService.addNewGroup(newGroup).subscribe(data => {
      this.showFormAdd = false;
      this.initForm();
      this.updateGroupsList();
    });
  }

  /**
   * Form edit submit
   */
  onSubmitFormEdit() {
    const formValue = this.groupFormEdit.value;
    const group = new GroupModel();
    group.label = formValue.label;
    group.id = formValue.id;
    group.classroomId = formValue.classroomId;
    this.pedagogyService.updateGroup(group).subscribe(data => {
      this.isEdit = false;
      this.initForm();
      this.updateGroupsList();
    });
  }

  /**
   * Update the groups list
   */
  updateGroupsList() {
    this.pedagogyService.getGroups(1).subscribe(groups => {
      this.groups = groups;
      this.pedagogyService.emitGroups(this.groups);
    });
  }

  initEditForm() {
    this.groupFormEdit = this.formBuilder.group({
      id: ['', Validators.required],
      label: ['', Validators.required],
      classroomId: [this.classrooms, Validators.required],
    });
  }

  /**
   * Edit the group form
   * @param index - Group ID
   */
  editGroup(index: number) {
    this.isEdit = true;
    this.pedagogyService.getGroup(index).pipe().subscribe(data => {
      this.groupFormEdit = this.formBuilder.group({
        id: [index, Validators.required],
        label: [data.label, Validators.required],
        classroomId: [data.classrooms, Validators.required],
      });
    });
  }

  /**
   * Get the label value on a classroom
   * @param id - Classroom ID
   */
  translateClassroomId(id: number) {
    const classroom = _.find(this.classrooms, o => o.id === id);

    if (typeof classroom !== 'undefined') {
      return classroom.label;
    }
  }

  deleteOpenDialog(index: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {titre: 'Suppression d\'une classe', contenu: 'Etes-vous sûr de supprimer cet enregistrement?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteGroup(index);
      }
    });
  }

  /**
   * Allow to delete a group
   * @param index - Group ID
   */
  deleteGroup(index: number) {
    this.pedagogyService.deleteGroup(index).pipe().subscribe(data => {
      this.updateGroupsList();
    });
  }

}
