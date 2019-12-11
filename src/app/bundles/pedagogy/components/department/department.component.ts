import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {DepartmentModel} from '../../models/department.model';
import {PedagogyService} from '../../services/pedagogy.service';
import {DialogComponent} from '../../../../commons/dialog/dialog.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  subscription: Subscription;
  departments: any;
  departmentForm: FormGroup;
  departmentFormEdit: FormGroup;
  showFormAdd: boolean;
  isEdit: boolean;
  pageIndex: number;
  pageSize: number;
  length: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['label', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  pageEvent: PageEvent;
  constructor(private formBuilder: FormBuilder,
              private pedagogyService: PedagogyService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
    this.initEditForm();
    this.loadDepartments();
    this.isEdit = false;
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {titre: 'Suppression d\'une spécialité', contenu: 'Etes-vous sûr de supprimer cet enregistrement?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteDepartment(index);
      }
    });
  }

  /**
   * Fonction permettant d'afficher le formulaire d'ajout
   */
  showForm() {
    this.showFormAdd = true;
  }

  /**
   * Chargement des départments
   */
  loadDepartments() {
    this.subscription = this.pedagogyService.departments$.subscribe((data) => {
      this.departments = new MatTableDataSource<DepartmentModel>(data);
      this.pageSize = 20;
      this.length = data.length;
      this.pageIndex = 1;
      this.departments.sort = this.sort;
      this.departments.paginator = this.paginator;
    });
  }

  /**
   * Initialisation du formulaire
   */
  initForm() {
    this.departmentForm = this.formBuilder.group({
      label: ['', Validators.required],
    });
  }

  initEditForm() {
    this.departmentFormEdit = this.formBuilder.group({
      id: ['', Validators.required],
      label: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.departmentForm.value;
    const newDepartment = new DepartmentModel();
    newDepartment.label = formValue.label;
    this.pedagogyService.addNewDepartment(newDepartment).subscribe(data => {
      this.showFormAdd = false;
      this.initForm();
      this.updateDepartmentList();
    });
  }

  onSubmitFormEdit() {
    const formValue = this.departmentFormEdit.value;
    const department = new DepartmentModel();
    department.label = formValue.label;
    department.id = formValue.id;
    this.pedagogyService.updateDepartment(department).subscribe(data => {
      this.isEdit = false;
      this.initForm();
      this.updateDepartmentList();
    });
  }

  /**
   * Permet d'afficher le formulaire
   */
  getShowForm() {
    return this.showFormAdd;
  }

  /**
   * Fonction de suppression
   * @param index - Index de l'enregistrement à supprimer
   */
  deleteDepartment(index: number) {
    console.log(index);
  }

  /**
   * Fonction de modification
   * @param index - Index de l'enregistrement à modifier
   */
  editDepartment(index: number) {
    this.isEdit = true;
    this.pedagogyService.getDepartment(index).pipe().subscribe(data => {
      this.departmentFormEdit = this.formBuilder.group({
        id: [index, Validators.required],
        label: [data.label, Validators.required],
      });
    });
  }

  updateDepartmentList() {
    this.pedagogyService.getDepartmentList().subscribe(departments => {
      this.departments = departments;
      this.pedagogyService.emitSpecialities(this.departments);
    });
  }
}
