import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule }                 from './app-routing.module';
import { AppComponent }                     from './app.component';
import { FooterComponent }                  from './views/footer/footer.component';
import { HeaderComponent }                     from './views/header/header.component';
import { MaterialModule }                      from './material/material.module';
import { MenuComponent }                       from './views/menu/menu.component';
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';
import { CookieService }                       from 'ngx-cookie-service';
import { AdminModule }                         from './admin/admin.module';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SchoolyearResolver }                  from './bundles/schoolyear/resolvers/schoolyear.resolver';
import { ClassroomResolver }    from './bundles/pedagogy/resolvers/classroom.resolver';
import { SessionResolver }      from './bundles/pedagogy/resolvers/session.resolver';
import { LevelResolver }        from './bundles/pedagogy/resolvers/level.resolver';
import { DepartmentResolver }   from './bundles/pedagogy/resolvers/department.resolver';
import { SnackBarService }      from './commons/snack/snack-bar.service';
import { LoginComponent }       from './login/login.component';
import { BasicAuthInterceptor } from './commons/auth/helpers/basic-authInterceptor';
import { JwtInterceptor }       from './commons/auth/helpers/jwt.interceptor';
import { ErrorInterceptor }     from './commons/auth/helpers/error.interceptor';
import { MatGridListModule }    from '@angular/material';

@NgModule ( {
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    MatGridListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    SchoolyearResolver,
    CookieService,
    ClassroomResolver,
    SessionResolver,
    LevelResolver,
    DepartmentResolver,
    SnackBarService ],
  exports: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
