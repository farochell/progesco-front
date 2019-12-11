import {DepartmentModel} from '../models/department.model';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {PedagogyService} from '../services/pedagogy.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable ()
export class DepartmentResolver implements Resolve<DepartmentModel[]> {
  private router: Router;

  constructor(private pedagogyService: PedagogyService) {
  }

  resolve(router: ActivatedRouteSnapshot): Observable<DepartmentModel[]> {
    return this.pedagogyService.getDepartmentList ().pipe (catchError (this.handleError));
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
