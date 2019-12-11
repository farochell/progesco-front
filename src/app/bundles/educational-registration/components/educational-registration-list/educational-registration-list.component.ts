import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatPaginator,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSort,
  MatTableDataSource,
  PageEvent
} from '@angular/material';
import {Subscription} from 'rxjs';
import * as _ from 'lodash';
import {EducationalRegistrationModel} from '../../models/educational-registration.model';
import {EducationalRegistrationService} from '../../services/educational-registration.service';
import {PedagogyService} from '../../../pedagogy/services/pedagogy.service';
import {ActivatedRoute} from '@angular/router';
import {ClassroomModel} from '../../../pedagogy/models/classroom.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../student/services/student.service';
import {SnackBarService} from '../../../../commons/snack/snack-bar.service';

@Component ({
  selector: 'app-educational-registration-list',
  templateUrl: './educational-registration-list.component.html',
  styleUrls: ['./educational-registration-list.component.scss']
})
export class EducationalRegistrationListComponent implements OnInit {
  subscription: Subscription;
  registrations: any;
  pageIndex: number;
  data: any;
  pageSize: number;
  length: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageEvent: PageEvent;
  classrooms: ClassroomModel[];
  showFormAdd: boolean;
  isEdit: boolean;
  registrationForm: FormGroup;
  registrationFormEdit: FormGroup;
  student: number;
  displayedColumns: string[] = ['registrationNumber', 'schoolYear', 'classroom', 'status'];
  @ViewChild (MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild (MatSort, {static: false}) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
              private studentService: StudentService,
              private educationalRegistrationService: EducationalRegistrationService,
              private pedagogyService: PedagogyService,
              private route: ActivatedRoute,
              private snackBarService: SnackBarService
              ) {
  }

  ngOnInit() {
    this.isEdit = false;
    this.loadRegistrations ();
    this.loadData ();
    this.initForm ();
    this.route.paramMap.subscribe (params => {
      this.student = Number (params.get ('id'));
    });
  }

  loadRegistrations() {
    this.subscription = this.educationalRegistrationService.registrations$.subscribe ((data) => {
      this.registrations = new MatTableDataSource<EducationalRegistrationModel>(data);
      this.pageSize = 20;
      this.length = data.length;
      this.pageIndex = 1;
      this.registrations.sort = this.sort;
      this.registrations.paginator = this.paginator;
    });
  }

  loadData() {
    this.route.data.subscribe (data => {
      this.data = data;
      this.classrooms = data.classrooms;
    });
  }

  showForm() {
    this.showFormAdd = true;
  }

  initForm() {
    this.registrationForm = this.formBuilder.group ({
      schoolyearId: [this.data.schoolyear, Validators.required],
      classroomId: ['', Validators.required],
      sessionId: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.registrationForm.value;
    const newRegistration = new EducationalRegistrationModel ();
    newRegistration.schoolYear = this.data.schoolyear.id;
    newRegistration.classroom = formValue.classroomId;
    newRegistration.session = formValue.sessionId;
    newRegistration.student = this.student;
    this.educationalRegistrationService.addNewRegistration (newRegistration).subscribe (data => {
      this.showFormAdd = false;
      this.initForm ();
    }, error1 => {
      this.snackBarService.openSnackBar(error1.error.message, 'error-snack');
      console.log (error1);
    });
  }

  /**
   * Return the schoolyear label
   * @param id - schoolyear ID
   */
  translateSchoolyear(id: number) {
    const schoolyear = _.find(this.data.schoolyears, o => o.id === id);
    if (typeof schoolyear !== 'undefined') {
      return schoolyear.label;
    }
  }

  /**
   * Return the classroom label
   * @param id - classroom ID
   */
  translateClassroom(id: number) {
    const classroom = _.find(this.classrooms, o => o.id === id);

    if (typeof classroom !== 'undefined') {
      return classroom.label;
    }
  }

  /**
   * Return the status label
   * @param id - status ID
   */
  translateStatus(id: number) {
    switch (id) {
      case 1:
        return 'En attente de validation';
      case 2:
        return 'Validée';
      case 3:
        return 'Report';
      case 4:
        return 'Abandon';
    }
  }

}
