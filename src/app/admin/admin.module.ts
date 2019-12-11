import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {SchoolyearComponent} from '../bundles/schoolyear/schoolyear.component';
import {PedagogyComponent} from '../bundles/pedagogy/pedagogy.component';
import {StudentComponent} from '../bundles/student/student.component';
import {HomeComponent} from '../bundles/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {SchoolyearService} from '../bundles/schoolyear/services/schoolyear.service';
import {PedagogyService} from '../bundles/pedagogy/services/pedagogy.service';
import {LevelComponent} from '../bundles/pedagogy/components/level/level.component';
import {DepartmentComponent} from '../bundles/pedagogy/components/department/department.component';
import {SpecialityComponent} from '../bundles/pedagogy/components/speciality/speciality.component';
import {CourseComponent} from '../bundles/pedagogy/components/course/course.component';
import {ClassroomComponent} from '../bundles/pedagogy/components/classroom/classroom.component';
import {DialogComponent} from '../commons/dialog/dialog.component';
import {StudentListComponent} from '../bundles/student/components/student-list/student-list.component';
import {StudentService} from '../bundles/student/services/student.service';
import { StudentPageComponent } from '../bundles/student/components/student-page/student-page.component';
import { EducationalRegistrationComponent } from '../bundles/educational-registration/educational-registration.component';
import {EducationalRegistrationService} from '../bundles/educational-registration/services/educational-registration.service';
// tslint:disable-next-line:max-line-length
import {EducationalRegistrationListComponent} from '../bundles/educational-registration/components/educational-registration-list/educational-registration-list.component';
import {SessionResolver} from '../bundles/pedagogy/resolvers/session.resolver';
import {LevelResolver} from '../bundles/pedagogy/resolvers/level.resolver';
import {DepartmentResolver} from '../bundles/pedagogy/resolvers/department.resolver';
import {SchoolyearsResolver} from '../bundles/schoolyear/resolvers/schoolyears.resolver';
import {GroupComponent} from '../bundles/pedagogy/components/group/group.component';
@NgModule({
  declarations: [
    SchoolyearComponent,
    PedagogyComponent,
    StudentComponent,
    HomeComponent,
    LevelComponent,
    DepartmentComponent,
    SpecialityComponent,
    CourseComponent,
    ClassroomComponent,
    DialogComponent,
    StudentListComponent,
    StudentPageComponent,
    EducationalRegistrationComponent,
    EducationalRegistrationListComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminRoutingModule,
  ],
  providers: [
    SchoolyearService,
    SchoolyearsResolver,
    PedagogyService,
    StudentService,
    EducationalRegistrationService,
    SessionResolver,
    LevelResolver,
    DepartmentResolver
  ]
})
export class AdminModule {
}
