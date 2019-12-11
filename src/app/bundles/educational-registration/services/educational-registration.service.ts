import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APPCONFIG} from '../../../constants/app-constants';
import {map} from 'rxjs/operators';
import {EducationalRegistrationModel} from '../models/educational-registration.model';


@Injectable({
  providedIn: 'root'
})
export class EducationalRegistrationService {
  private registrationsSource = new Subject<any>();
  registrations$ = this.registrationsSource.asObservable();

  constructor(private http: HttpClient) {
  }

  /**
   * Emit the registrations
   * @param registrations - registrations list
   */
  emitRegistrations(registrations: any) {
    this.registrationsSource.next(registrations);
  }

  /**
   * Return the list of the registrations
   */
  getRegistrations(page: number) {
    return this.http.get<any>(APPCONFIG.apiUrl + 'educationalregistrations/page/' + page).pipe(map(data => {
      return data;
    }));
  }

  /**
   * Allows to create a new student
   * @param educationalRegistrationModel - Registration model
   */
  addNewRegistration(educationalRegistrationModel: EducationalRegistrationModel) {
    return this.http.post(APPCONFIG.apiUrl + 'educationalregistrations', educationalRegistrationModel).pipe(map(data => {
      return data;
    }));
  }

  /**
   * Allow to update a registration
   * @param educationalRegistrationModel - Registration model
   */
  updateRegistration(educationalRegistrationModel: EducationalRegistrationModel) {
    return this.http.put(APPCONFIG.apiUrl + 'educationalregistrations', educationalRegistrationModel).pipe(map(data => {
      return data;
    }));
  }

  /**
   * Retrieve a registration by ID
   * @param index - Registration ID
   */
  getRegistration(index: number) {
    return this.http.get<any>(APPCONFIG.apiUrl + 'educationalregistrations/' + index).pipe(map(data => {
      return data;
    }));
  }

  /**
   * Retrieve all registrations of given studentID
   * @param studentId - Student ID
   */
  getStudentRegistration(studentId: number) {
    return this.http.get<any>(APPCONFIG.apiUrl + 'educationalregistrations/student/' + studentId + '/registrations').pipe(map(data => {
      return data;
    }));
  }
}
