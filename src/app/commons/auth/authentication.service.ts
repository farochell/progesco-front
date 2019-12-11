import { APPCONFIG }  from '../../constants/app-constants';
import { Injectable } from '@angular/core';
import { map }        from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  error: any;
  constructor(private http: HttpClient) { }

  /**
   * Login function
   * @param {string} usernameOrEmail
   * @param {string} password
   * @returns {Observable<any>}
   */
  login (usernameOrEmail: string, password: string) {
    return this.http.post<any>(APPCONFIG.apiUrl + 'api/auth/signin', { usernameOrEmail, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
          user.authdata = window.btoa(usernameOrEmail + ':' + password);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  /**
   * Logout function
   */
  logout () {
    localStorage.removeItem('currentUser');
  }
}
