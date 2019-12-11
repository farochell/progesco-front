import { AuthGuardService }      from '../commons/auth/auth-guard.service';
import { AuthenticationService } from '../commons/auth/authentication.service';
import { LoginComponent }        from './login.component';
import { RouterModule, Routes }  from '@angular/router';
import { NgModule }              from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    AuthenticationService
  ]
})
export class LoginRoutingModule { }
