import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {SessionModel} from '../models/session.model';
import {PedagogyService} from '../services/pedagogy.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable ()
export class SessionResolver implements Resolve<SessionModel[]> {
  private router: Router;

  constructor(private pedagogyService: PedagogyService) {
  }

  resolve(router: ActivatedRouteSnapshot): Observable<SessionModel[]> {
    return this.pedagogyService.getSessionList().pipe (catchError (this.handleError));
  }

  handleError(errorResponse: HttpErrorResponse) {
    switch (errorResponse.status) {
      case 404: {
        this.router.navigate (['/not-found']);
        return of (null);
      }
      case 403: {
        this.router.navigate (['/unauthorized']);
        return of (null);
      }
      default: {
        console.error (errorResponse);
        this.router.navigate (['/error']);
        return of (null);
      }
    }
    return Observable.throw (errorResponse.message || 'Server error');
  }
}
