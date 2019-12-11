import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminModule }          from './admin/admin.module';
import { SchoolyearResolver }   from './bundles/schoolyear/resolvers/schoolyear.resolver';
import { AuthGuardService }     from './commons/auth/auth-guard.service';
import { LoginComponent }       from './login/login.component';

const routes: Routes = [ {
  path: 'admin',
  loadChildren: () => AdminModule,
  resolve: {
    schoolyear: SchoolyearResolver,
  },
  canActivate: [ AuthGuardService ]
},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule ( {
  imports: [ RouterModule.forRoot ( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
