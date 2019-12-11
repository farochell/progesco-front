import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APPCONFIG } from '../../../constants/app-constants';
import {SchoolyearModel} from '../models/schoolyear.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearService {
  private schoolyearsSource = new Subject<any>();
  private api:any;
  schoolyears$ = this.schoolyearsSource.asObservable();
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.api = APPCONFIG.apiUrl + 'progesco-schoolyear/';
  }

  /**
   * Emit the schoolyears
   * @param schoolyears - SchoolYear list
   */
  emitSchoolyears(schoolyears: any) {
    this.schoolyearsSource.next(schoolyears);
  }

  /**
   * Return the list of the school years
   */
  getSchoolyears() {
    return this.http.get<any>(this.api + 'schoolyears').pipe(map(data => {
      return data;
    }));
  }

  /**
   * Return the active school year
   */
  getActiveSchoolyear(): Observable<SchoolyearModel> {
    return this.http.get<SchoolyearModel>(this.api + 'schoolyears/activeyear').pipe(map(data => {
      this.cookieService.set( 'activeyear', data.label );
      return data;
    }));
  }
}
