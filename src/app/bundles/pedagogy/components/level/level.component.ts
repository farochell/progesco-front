import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LevelModel } from '../../models/level.model';
import { DialogComponent } from '../../../../commons/dialog/dialog.component';
import {PedagogyService} from '../../services/pedagogy.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  subscription: Subscription;
  levels: any;
  levelForm: FormGroup;
  levelFormEdit: FormGroup;
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
    this.loadLevels();
    this.isEdit = false;
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {titre: 'Suppression d\'un niveau', contenu: 'Etes-vous sûr de supprimer cet enregistrement?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteLevel(index);
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
  loadLevels() {
    this.subscription = this.pedagogyService.levels$.subscribe((data) => {
      this.levels = new MatTableDataSource<LevelModel>(data);
      this.pageSize = 20;
      this.length = data.length;
      this.pageIndex = 1;
      this.levels.sort = this.sort;
      this.levels.paginator = this.paginator;
    });
  }

  /**
   * Initialistion du formulaire
   */
  initForm() {
    this.levelForm = this.formBuilder.group({
      label: ['', Validators.required],
    });
  }

  initEditForm() {
    this.levelFormEdit = this.formBuilder.group({
      id: ['', Validators.required],
      label: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.levelForm.value;
    const newLevel = new LevelModel();
    newLevel.label = formValue.label;
    this.pedagogyService.addNewLevel(newLevel).subscribe(data => {
      this.showFormAdd = false;
      this.initForm();
      this.updateLevelList();
    });
  }

  onSubmitFormEdit() {
    const formValue = this.levelFormEdit.value;
    const level = new LevelModel();
    level.label = formValue.label;
    level.id = formValue.id;
    this.pedagogyService.updateLevel(level).subscribe(data => {
      this.isEdit = false;
      this.initForm();
      this.updateLevelList();
    });
  }

  /**
   * Permet d'afficher le formulaire
   */
  getShowForm() {
    return this.showFormAdd;
  }

  deleteLevel(index: number) {
    console.log(index);
  }

  /**
   * Fonction de modification
   * @param index - Index de l'enregistrement à modifier
   */
  editLevel(index: number) {
    this.isEdit = true;
    this.pedagogyService.getLevel(index).pipe().subscribe(data => {
      this.levelFormEdit = this.formBuilder.group({
        id: [index, Validators.required],
        label: [data.label, Validators.required],
      });
    });
  }

  updateLevelList() {
    this.pedagogyService.getLevelList().subscribe(levels => {
      this.levels = levels;
      this.pedagogyService.emitLevels(this.levels);
    });
  }
}
