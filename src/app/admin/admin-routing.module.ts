import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolyearComponent }  from '../bundles/schoolyear/schoolyear.component';
import { PedagogyComponent }    from '../bundles/pedagogy/pedagogy.component';
import { StudentComponent }     from '../bundles/student/student.component';
import { HomeComponent }        from '../bundles/home/home.component';
import { StudentPageComponent } from '../bundles/student/components/student-page/student-page.component';
import { SchoolyearResolver }   from '../bundles/schoolyear/resolvers/schoolyear.resolver';
import { ClassroomResolver }    from '../bundles/pedagogy/resolvers/classroom.resolver';
import { SessionResolver }      from '../bundles/pedagogy/resolvers/session.resolver';
import { LevelResolver }        from '../bundles/pedagogy/resolvers/level.resolver';
import { DepartmentResolver }   from '../bundles/pedagogy/resolvers/department.resolver';
import { SchoolyearsResolver }  from '../bundles/schoolyear/resolvers/schoolyears.resolver';


const routes: Routes = [
  /*{
    path: '',
    children: [ {
      path: '',
      component: HomeComponent,
    } ]
  },*/
  {
    path: 'annee-scolaires',
    component: SchoolyearComponent,
  },
  {
    path: 'pedagogie',
    component: PedagogyComponent,
  },
  {
    path: 'etudiants',
    children: [ {
      path: '',
      component: StudentComponent,
    }, {
      path: ':id',
      component: StudentPageComponent,
      resolve: {
        schoolyear: SchoolyearResolver,
        schoolyears: SchoolyearsResolver,
        classrooms: ClassroomResolver,
        sessions: SessionResolver,
        levels: LevelResolver,
        departments: DepartmentResolver
      },
    }
    ]
  },
];

@NgModule ( {
  imports: [ RouterModule.forChild ( routes ) ],
  exports: [ RouterModule ]
} )
export class AdminRoutingModule {
}
