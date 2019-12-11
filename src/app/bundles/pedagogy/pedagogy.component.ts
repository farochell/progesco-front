import { Component, OnInit } from '@angular/core';
import {PedagogyService} from './services/pedagogy.service';

@Component({
  selector: 'app-pedagogy',
  templateUrl: './pedagogy.component.html',
  styleUrls: ['./pedagogy.component.scss']
})
export class PedagogyComponent implements OnInit {
  levels: any;
  specialities: any;
  departments: any;
  courses: any;
  classrooms: any;
  groups: any;
  constructor(private pedagogyService: PedagogyService) { }

  ngOnInit() {
    this.pedagogyService.getLevelList().pipe().subscribe(data => {
      this.levels = data;
      this.pedagogyService.emitLevels(this.levels);
    });

    this.pedagogyService.getSpecialityList().pipe().subscribe(data => {
      this.specialities = data;
      this.pedagogyService.emitSpecialities(this.specialities);
    });

    this.pedagogyService.getDepartmentList().pipe().subscribe(data => {
      this.departments = data;
      this.pedagogyService.emitDepartments(this.departments);
    });

    this.pedagogyService.getCourseList().pipe().subscribe(data => {
      this.courses = data;
      this.pedagogyService.emitCourses(this.courses);
    });

    this.pedagogyService.getClassroomList().pipe().subscribe(data => {
      this.classrooms = data;
      this.pedagogyService.emitClassrooms(this.classrooms);
    });

    this.pedagogyService.getGroups(1).pipe().subscribe(data => {
      this.groups = data;
      this.pedagogyService.emitGroups(this.groups);
    });
  }
}
