import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {PedagogyService} from '../../services/pedagogy.service';
import {SpecialityModel} from '../../models/speciality.model';
import {DialogComponent} from '../../../../commons/dialog/dialog.component';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {
  subscription: Subscription;
  specialities: any;
  specialityForm: FormGroup;
  specialityFormEdit: FormGroup;
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
    this.loadSpecialities();
    this.isEdit = false;
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {titre: 'Suppression d\'une spécialité', contenu: 'Etes-vous sûr de supprimer cet enregistrement?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSpeciality(index);
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
   * Chargement des niveaux
   */
  loadSpecialities() {
    this.subscription = this.pedagogyService.specialities$.subscribe((data) => {
      this.specialities = new MatTableDataSource<SpecialityModel>(data);
      this.pageSize = 20;
      this.length = data.length;
      this.pageIndex = 1;
      this.specialities.sort = this.sort;
      this.specialities.paginator = this.paginator;
    });
  }

  /**
   * Initialisation du formulaire
   */
  initForm() {
    this.specialityForm = this.formBuilder.group({
      label: ['', Validators.required],
    });
  }

  initEditForm() {
    this.specialityFormEdit = this.formBuilder.group({
      id: ['', Validators.required],
      label: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.specialityForm.value;
    const newSpeciality = new SpecialityModel();
    newSpeciality.label = formValue.label;
    this.pedagogyService.addNewSpeciality(newSpeciality).subscribe(data => {
      this.showFormAdd = false;
      this.initForm();
      this.updateSpecialityList();
    });
  }

  onSubmitFormEdit() {
    const formValue = this.specialityFormEdit.value;
    const speciality = new SpecialityModel();
    speciality.label = formValue.label;
    speciality.id = formValue.id;
    this.pedagogyService.updateSpeciality(speciality).subscribe(data => {
      this.isEdit = false;
      this.initForm();
      this.updateSpecialityList();
    });
  }

  /**
   * Permet d'afficher le formulaire
   */
  getShowForm() {
    return this.showFormAdd;
  }

  deleteSpeciality(index: number) {
    console.log(index);
  }

  /**
   * Fonction de modification
   * @param index - Index de l'enregistrement à modifier
   */
  editSpeciality(index: number) {
    this.isEdit = true;
    this.pedagogyService.getSpeciality(index).pipe().subscribe(data => {
      this.specialityFormEdit = this.formBuilder.group({
        id: [index, Validators.required],
        label: [data.label, Validators.required],
      });
    });
  }

  updateSpecialityList() {
    this.pedagogyService.getSpecialityList().subscribe(specialities => {
      this.specialities = specialities;
      this.pedagogyService.emitSpecialities(this.specialities);
    });
  }
}
