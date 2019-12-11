import { Injectable }   from '@angular/core';
import { APPCONFIG }    from '../../../constants/app-constants';
import { StudentModel } from '../models/student.model';
import { Subject }      from 'rxjs';
import { map }          from 'rxjs/operators';
import { HttpClient }   from '@angular/common/http';

@Injectable ( {
  providedIn: 'root'
} )
export class StudentService {
  private studentsSource = new Subject<any> ();
  students$              = this.studentsSource.asObservable ();
  private api:any;
  constructor(private http: HttpClient) {
    this.api = APPCONFIG.apiUrl + 'progesco-student/';
  }

  /**
   * Emit the students
   * @param students - students list
   */
  emitStudents(students: any) {
    this.studentsSource.next ( students );
  }

  /**
   * Return the list of the students
   */
  getStudents(page: number) {
    return this.http.get<any> ( this.api + 'students/page/' + page ).pipe ( map ( data => {
      return data;
    } ) );
  }

  /**
   * Allows to create a new student
   * @param studentModel - Student model
   */
  addNewStudent(studentModel: StudentModel) {
    return this.http.post ( this.api + 'students', studentModel ).pipe ( map ( data => {
      return data;
    } ) );
  }

  /**
   * Allow to update a student
   * @param studentModel - Student model
   */
  updateStudent(studentModel: StudentModel) {
    return this.http.put ( this.api + 'students', studentModel ).pipe ( map ( data => {
      return data;
    } ) );
  }

  /**
   * Retrieve a student by ID
   * @param index - Student ID
   */
  getStudent(index: number) {
    return this.http.get<any> ( this.api + 'students/' + index ).pipe ( map ( data => {
      return data;
    } ) );
  }
}
