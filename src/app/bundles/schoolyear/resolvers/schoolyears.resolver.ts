import {Injectable} from '@angular/core';
import {SchoolyearModel} from '../models/schoolyear.model';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {SchoolyearService} from '../services/schoolyear.service';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {catchError} from 'rxjs/operators';

@Injectable ()
export class SchoolyearsResolver implements Resolve<SchoolyearModel> {
  private router: Router;
  constructor(private schoolyearService: SchoolyearService) {
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

  resolve(router: ActivatedRouteSnapshot): Observable<SchoolyearModel> {
    return this.schoolyearService.getSchoolyears().pipe (catchError (this.handleError));
  }
}
