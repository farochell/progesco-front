import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartmentModel} from '../../models/department.model';
import {ClassroomModel} from '../../models/classroom.model';
import {LevelModel} from '../../models/level.model';
import {PedagogyService} from '../../services/pedagogy.service';
import {DialogComponent} from '../../../../commons/dialog/dialog.component';
import {Subscription} from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
  subscription: Subscription;
  classrooms: any;
  levels: LevelModel[];
  departments: DepartmentModel[];
  classroomForm: FormGroup;
  classroomFormEdit: FormGroup;
  showFormAdd: boolean;
  isEdit: boolean;
  pageIndex: number;
  pageSize: number;
  length: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['label', 'levelId', 'departmentId', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  pageEvent: PageEvent;

  constructor(private formBuilder: FormBuilder,
              private pedagogyService: PedagogyService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isEdit = false;
    this.loadClassrooms();
    this.initForm();
    this.initEditForm();
    this.loadDepartments();
    this.loadLevels();
  }

  /**
   * Fonction permettant d'afficher le formulaire d'ajout
   */
  showForm() {
    this.showFormAdd = true;
  }

  /**
   * Permet d'afficher le formulaire
   */
  getShowForm() {
    return this.showFormAdd;
  }

  /**
   * Chargement des départements
   */
  loadDepartments() {
    this.subscription = this.pedagogyService.departments$.subscribe((data) => {
      this.departments = data;
    });
  }

  /**
   * Chargement des niveaux
   */
  loadLevels() {
    this.subscription = this.pedagogyService.levels$.subscribe((data) => {
      this.levels = data;
    });
  }

  /**
   * Chargement des cours
   */
  loadClassrooms() {
    this.subscription = this.pedagogyService.classrooms$.subscribe((data) => {
      this.classrooms = new MatTableDataSource<ClassroomModel>(data);
      this.pageSize = 20;
      this.length = data.length;
      this.pageIndex = 1;
      this.classrooms.sort = this.sort;
      this.classrooms.paginator = this.paginator;
    });
  }

  /**
   * Fonction d'initialisation du formulaire
   */
  initForm() {
    this.classroomForm = this.formBuilder.group({
      label: ['', Validators.required],
      levelId: [this.levels, Validators.required],
      departmentId: [this.departments, Validators.required],
    });
  }

  /**
   * Formulaire de soumission
   */
  onSubmitForm() {
    const formValue = this.classroomForm.value;
    const newClassroom = new ClassroomModel();
    newClassroom.label = formValue.label;
    newClassroom.levelId = formValue.levelId;
    newClassroom.departmentId = formValue.departmentId;
    this.pedagogyService.addNewClassroom(newClassroom).subscribe(data => {
      this.showFormAdd = false;
      this.initForm();
      this.updateClassroomsList();
    });
  }

  onSubmitFormEdit() {
    const formValue = this.classroomFormEdit.value;
    const classroom = new ClassroomModel();
    classroom.label = formValue.label;
    classroom.id = formValue.id;
    classroom.departmentId = formValue.departmentId;
    classroom.levelId = formValue.levelId;
    this.pedagogyService.updateClassroom(classroom).subscribe(data => {
      this.isEdit = false;
      this.initForm();
      this.updateClassroomsList();
    });
  }

  /**
   * Rechargement de la liste des cours
   */
  updateClassroomsList() {
    this.pedagogyService.getClassroomList().subscribe(classrooms => {
      this.classrooms = classrooms;
      this.pedagogyService.emitClassrooms(this.classrooms);
    });
  }

  initEditForm() {
    this.classroomFormEdit = this.formBuilder.group({
      id: ['', Validators.required],
      label: ['', Validators.required],
      levelId: [this.levels, Validators.required],
      departmentId: [this.departments, Validators.required]
    });
  }

  /**
   * Fonction de modification
   * @param index - Index de l'enregistrement à modifier
   */
  editClassroom(index: number) {
    this.isEdit = true;
    this.pedagogyService.getClassroom(index).pipe().subscribe(data => {
      this.classroomFormEdit = this.formBuilder.group({
        id: [index, Validators.required],
        label: [data.label, Validators.required],
        levelId: [data.levelId, Validators.required],
        departmentId: [data.departmentId, Validators.required]
      });
    });
  }

  /**
   * Allows to get department label value
   * @param id - Department ID
   */
  translateDepartmentId(id: number) {
    const department = _.find(this.departments, o => o.id === id);

    if (typeof department !== 'undefined') {
      return department.label;
    }
  }

  /**
   * Allows to get level label value
   * @param id - Level ID
   */
  translateLevelId(id: number) {
    const level = _.find(this.levels, o => o.id === id);

    if (typeof level !== 'undefined') {
      return level.label;
    }
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {titre: 'Suppression d\'une classe', contenu: 'Etes-vous sûr de supprimer cet enregistrement?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteClassroom(index);
      }
    });
  }

  deleteClassroom(index: number) {}
}
