import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {StudentService} from '../../services/student.service';
import {StudentModel} from '../../models/student.model';
import {EducationalRegistrationService} from '../../../educational-registration/services/educational-registration.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {
  student: StudentModel;
  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private educationalRegistrationService: EducationalRegistrationService
              ) { }

  ngOnInit() {
    this.student = new StudentModel();
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.studentService.getStudent(id).subscribe((data) => {
        this.student = data;
      });
      this.educationalRegistrationService.getStudentRegistration (Number (params.get ('id'))).pipe ().subscribe ((data) => {
        this.educationalRegistrationService.emitRegistrations (data);
      });
    });
  }

}
