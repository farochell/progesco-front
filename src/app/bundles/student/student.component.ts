import { Component, OnInit } from '@angular/core';
import { StudentService }    from './services/student.service';
import { ActivatedRoute }    from '@angular/router';

@Component ( {
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: [ './student.component.scss' ]
} )
export class StudentComponent implements OnInit {
  students: any;

  constructor(private route: ActivatedRoute,
              private studentService: StudentService) {
  }

  ngOnInit() {
    this.studentService.getStudents ( 1 ).pipe ().subscribe ( (data) => {
      this.students = data;
      this.studentService.emitStudents ( this.students );
    } );
  }

}
