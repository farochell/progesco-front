import { Component, OnInit }                  from '@angular/core';
import { User }                               from './models/user';
import { AuthenticationService }              from '../commons/auth/authentication.service';
import { ActivatedRoute, Router }             from '@angular/router';
import { CookieService }                      from 'ngx-cookie-service';
import { first }                              from 'rxjs/operators';
import { UserService }                        from './services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component ( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {
  message: string = 'Vous êtes déconnecté.';
  private username: string;
  private password: string;
  loginForm: FormGroup;
  returnUrl: string;
  user: User;
  error           = '';
  loading         = false;

  constructor(private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    this.user = new User ();
    this.initForm ();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initForm() {
    this.loginForm = this.formBuilder.group ( {
      usernameOrEmail: [ '', Validators.required ],
      password: [ '', Validators.required ],
    } );
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    this.authService.login ( formValue.usernameOrEmail, formValue.password )
      .pipe ( first () )
      .subscribe ( data => {
          console.log(this.returnUrl);
          this.user.usernameOrEmail = formValue.usernameOrEmail;
          this.cookieService.set ( 'user', JSON.stringify ( this.user ) );
          this.router.navigate ( [ this.returnUrl ] );
          //this.router.navigate ( [ this.returnUrl ] );
          /*this.userService.getUserInfo().subscribe(user => {
           this.cookieService.set('user', JSON.stringify(user));
           this.user = user;
           })
           this.router.navigate([this.returnUrl]);*/
        },
        error => {
          this.error   = error;
          this.loading = false;
        } );
    /*this.message = 'Tentative de connexion en cours...';
     this.loading = true;
     this.authService.login(form.value.username, form.value.password)
     .pipe(first())
     .subscribe(data => {
     this.userService.getUserInfo().subscribe(user => {
     this.cookieService.set('user', JSON.stringify(user));
     this.user = user;
     })
     this.router.navigate([this.returnUrl]);
     },
     error => {
     this.error = error;
     this.loading = false;
     });*/
  }

}
