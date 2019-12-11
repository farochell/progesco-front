import {LevelModel} from '../models/level.model';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {PedagogyService} from '../services/pedagogy.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable ()
export class LevelResolver implements Resolve<LevelModel[]> {
  private router: Router;
  constructor(private pedagogyService: PedagogyService) {
  }

  resolve(router: ActivatedRouteSnapshot): Observable<LevelModel[]> {
    return this.pedagogyService.getLevelList ().pipe (catchError (this.handleError));
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
