import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PedagogyService} from '../../services/pedagogy.service';
import {CourseModel} from '../../models/course.model';
import {DialogComponent} from '../../../../commons/dialog/dialog.component';
import {Subscription} from 'rxjs';
import {SpecialityModel} from '../../models/speciality.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  subscription: Subscription;
  courses: any;
  specialities: SpecialityModel[];
  courseForm: FormGroup;
  courseFormEdit: FormGroup;
  showFormAdd: boolean;
  isEdit: boolean;
  pageIndex: number;
  pageSize: number;
  length: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['registrationNumber', 'label', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  pageEvent: PageEvent;

  constructor(private formBuilder: FormBuilder,
              private pedagogyService: PedagogyService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isEdit = false;
    this.loadCourses();
    this.initForm();
    this.initEditForm();
    this.loadSpecialities();
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
   * Chargement des spécialités
   */
  loadSpecialities() {
    this.subscription = this.pedagogyService.specialities$.subscribe((data) => {
      this.specialities = data;
    });
  }

  /**
   * Chargement des cours
   */
  loadCourses() {
    this.subscription = this.pedagogyService.courses$.subscribe((data) => {
      this.courses = new MatTableDataSource<CourseModel>(data);
      this.pageSize = 20;
      this.length = data.length;
      this.pageIndex = 1;
      this.courses.sort = this.sort;
      this.courses.paginator = this.paginator;
    });
  }

  /**
   * Fonction d'initialisation du formulaire
   */
  initForm() {
    this.courseForm = this.formBuilder.group({
      label: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      specialityId: [this.specialities, Validators.required],
    });
  }

  /**
   * Formulaire de soumission
   */
  onSubmitForm() {
    const formValue = this.courseForm.value;
    const newCourse = new CourseModel();
    newCourse.label = formValue.label;
    newCourse.registrationNumber = formValue.registrationNumber;
    this.pedagogyService.addNewCourse(newCourse).subscribe(data => {
      this.showFormAdd = false;
      this.initForm();
      this.updateCoursesList();
    });
  }

  onSubmitFormEdit() {
    const formValue = this.courseFormEdit.value;
    const course = new CourseModel();
    course.label = formValue.label;
    course.id = formValue.id;
    course.registrationNumber = formValue.registrationNumber;
    this.pedagogyService.updateCourse(course).subscribe(data => {
      this.isEdit = false;
      this.initForm();
      this.updateCoursesList();
    });
  }

  /**
   * Rechargement de la liste des cours
   */
  updateCoursesList() {
    this.pedagogyService.getCourseList().subscribe(courses => {
      this.courses = courses;
      this.pedagogyService.emitCourses(this.courses);
    });
  }

  initEditForm() {
    this.courseFormEdit = this.formBuilder.group({
      id: ['', Validators.required],
      label: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      specialityId: [this.specialities, Validators.required]
    });
  }

  /**
   * Fonction de modification
   * @param index - Index de l'enregistrement à modifier
   */
  editCourse(index: number) {
    this.isEdit = true;
    this.pedagogyService.getCourse(index).pipe().subscribe(data => {
      this.courseFormEdit = this.formBuilder.group({
        id: [index, Validators.required],
        label: [data.label, Validators.required],
        registrationNumber: [data.registrationNumber, Validators.required],
        specialityId: [data.specialityId, Validators.required]
      });
    });
  }

  /**
   * Fonction permettant de récupérer le nom de la spécialité via son ID
   * @param id - ID de la spécialité
   */
  translateSpecialityId(id: number) {
    // tslint:disable-next-line:only-arrow-functions
    const speciality = _.find(this.specialities, function(o) {
      return o.id === id;
    });
    if (typeof speciality !== 'undefined') {
      return speciality.label;
    }
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {titre: 'Suppression d\'un cours', contenu: 'Etes-vous sûr de supprimer cet enregistrement?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCourse(index);
      }
    });
  }

  deleteCourse(index: number) {
  }
}
