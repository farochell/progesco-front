import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentModel} from '../../models/student.model';
import {StudentService} from '../../services/student.service';
import {Subscription} from 'rxjs';
import {DialogComponent} from '../../../../commons/dialog/dialog.component';
import {MatTableDataSource} from '@angular/material';
import {Gender} from '../../interfaces/gender.interface';
import {Router} from '@angular/router';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  subscription: Subscription;
  students: any;
  studentForm: FormGroup;
  studentFormEdit: FormGroup;
  showFormAdd: boolean;
  isEdit: boolean;
  pageIndex: number;
  pageSize: number;
  length: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['registrationNumber', 'firstName', 'lastName', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  isLoadingResults = false;
  isRateLimitReached = false;
  pageEvent: PageEvent;

  genders: Gender[] = [
    {value: 'M', viewValue: 'Masculin'},
    {value: 'F', viewValue: 'Féminin'}
  ];
  constructor(private formBuilder: FormBuilder,
              private studentService: StudentService,
              public dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
    this.initEditForm();
    this.loadStudents();
    this.isEdit = false;
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {titre: 'Suppression d\'un niveau', contenu: 'Etes-vous sûr de supprimer cet enregistrement?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteStudent(index);
      }
    });
  }

  /**
   * Allow to show form
   */
  showForm() {
    this.showFormAdd = true;
  }

  /**
   * Load students list
   */
  loadStudents() {
    this.subscription = this.studentService.students$.subscribe((data) => {
      this.students = new MatTableDataSource<StudentModel>(data.studentModels);
      this.pageSize = 20;
      this.length = data.pageNumbers;
      this.pageIndex = 1;
      this.students.sort = this.sort;
      this.students.paginator = this.paginator;
      this.isLoadingResults = false;
    });
  }

  /**
   * Initialize student form
   */
  initForm() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      fatherLastname: ['', Validators.required],
      fatherFirstname: ['', Validators.required],
      motherLastname: ['', Validators.required],
      motherFirstname: ['', Validators.required],
      gender: ['', Validators.required],
      email: [''],
      mainPhone: [''],
      secondPhone: [''],
      fatherProfession: [''],
      motherProfession: [''],
      maritalStatus: [''],
      guardianLastname: [''],
      guardianFirstname: [''],
      guardianMainPhone: [''],
      guardianSecondPhone: [''],
      guardianAddress: [''],
      nbChild: [''],
      address: [''],
    });
  }

  /**
   * Initialize student edit form
   */
  initEditForm() {
    this.isEdit = true;
    this.studentFormEdit = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      fatherLastname: ['', Validators.required],
      fatherFirstname: ['', Validators.required],
      motherLastname: ['', Validators.required],
      motherFirstname: ['', Validators.required],
      gender: ['', Validators.required],
      email: [''],
      mainPhone: [''],
      secondPhone: [''],
      fatherProfession: [''],
      motherProfession: [''],
      maritalStatus: [''],
      guardianLastname: [''],
      guardianFirstname: [''],
      guardianMainPhone: [''],
      guardianSecondPhone: [''],
      guardianAddress: [''],
      nbChild: [''],
      address: [''],
    });
  }

  /**
   * Form add submit function
   */
  onSubmitForm() {
    const formValue = this.studentForm.value;
    const newStudent = new StudentModel();
    newStudent.firstName = formValue.firstName;
    newStudent.lastName = formValue.lastName;
    newStudent.birthDate = formValue.birthDate;
    newStudent.placeOfBirth = formValue.placeOfBirth;
    newStudent.fatherLastname = formValue.fatherLastname;
    newStudent.fatherFirstname = formValue.fatherFirstname;
    newStudent.motherLastname = formValue.motherLastname;
    newStudent.motherFirstname = formValue.motherFirstname;
    newStudent.email = formValue.email;
    newStudent.mainPhone = formValue.mainPhone;
    newStudent.secondPhone = formValue.secondPhone;
    newStudent.fatherProfession = formValue.fatherProfession;
    newStudent.motherProfession = formValue.motherProfession;
    newStudent.maritalStatus = formValue.maritalStatus;
    newStudent.guardianLastname = formValue.guardianLastname;
    newStudent.guardianFirstname = formValue.guardianFirstname;
    newStudent.guardianMainPhone = formValue.guardianMainPhone;
    newStudent.guardianSecondPhone = formValue.guardianSecondPhone;
    newStudent.guardianAddress = formValue.guardianAddress;
    newStudent.nbChild = formValue.nbChild;
    newStudent.address = formValue.address;
    newStudent.gender = formValue.gender.value;
    this.studentService.addNewStudent(newStudent).subscribe(data => {
      this.showFormAdd = false;
      this.initForm();
      this.updatenewStudentList();
    });
  }

  onSubmitFormEdit(){}

  /**
   * Refresh students list after an add or an update
   */
  updatenewStudentList() {
    this.studentService.getStudents(1).subscribe(data => {
      this.students = new MatTableDataSource<StudentModel>(data.studentModels);
      this.pageSize = 20;
      this.length = data.pageNumbers;
      this.pageIndex = 1;
      this.students.sort = this.sort;
      this.students.paginator = this.paginator;
      this.isLoadingResults = false;
      this.studentService.emitStudents(data);
    });
  }

  getShowForm() {
    return this.showFormAdd;
  }

  /**
   * Allow to delete student by ID
   * @param index Student ID
   */
  deleteStudent(index: number) {
    console.log(index);
  }

  /**
   * Allow to edit a student by given ID
   * @param index Student ID
   */
  editStudent(index: number) {
    this.isEdit = true;
    this.studentService.getStudent(index).pipe().subscribe(data => {
      this.studentFormEdit = this.formBuilder.group({
        id: [index, Validators.required],
        firstName: [data.firstName, Validators.required],
        lastName: [data.lastName, Validators.required],
        birthDate: [data.birthDate, Validators.required],
        placeOfBirth: [data.placeOfBirth, Validators.required],
        fatherLastname: [data.fatherLastname, Validators.required],
        fatherFirstname: [data.fatherFirstname, Validators.required],
        motherLastname: [data.motherLastname, Validators.required],
        motherFirstname: [data.motherFirstname, Validators.required],
        gender: [data.gender, Validators.required],
        email: [data.email],
        mainPhone: [data.mainPhone],
        secondPhone: [data.secondPhone],
        fatherProfession: [data.fatherProfession],
        motherProfession: [data.motherProfession],
        maritalStatus: [data.maritalStatus],
        guardianLastname: [data.guardianLastname],
        guardianFirstname: [data.guardianFirstname],
        guardianMainPhone: [data.guardianMainPhone],
        guardianSecondPhone: [data.guardianSecondPhone],
        guardianAddress: [data.guardianAddress],
        nbChild: [data.nbChild],
        address: [data.address],
      });
    });
  }

  viewStudent(index: number) {
    this.router.navigate(['/admin/etudiants/' + index]);
  }
}
