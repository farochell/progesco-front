import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APPCONFIG} from '../../../constants/app-constants';
import {map} from 'rxjs/operators';
import {LevelModel} from '../models/level.model';
import {SpecialityModel} from '../models/speciality.model';
import {DepartmentModel} from '../models/department.model';
import {CourseModel} from '../models/course.model';
import {ClassroomModel} from '../models/classroom.model';
import {SessionModel} from '../models/session.model';
import {GroupModel} from '../models/group.model';

@Injectable ({
  providedIn: 'root'
})
export class PedagogyService {
  private api:any;
  private levelsSource = new Subject<any> ();
  levels$ = this.levelsSource.asObservable ();

  private departmentsSource = new Subject<any> ();
  departments$ = this.departmentsSource.asObservable ();

  private specialitiesSource = new Subject<any> ();
  specialities$ = this.specialitiesSource.asObservable ();

  private coursesSource = new Subject<any> ();
  courses$ = this.coursesSource.asObservable ();

  private classroomsSource = new Subject<any> ();
  classrooms$ = this.classroomsSource.asObservable ();

  private sessionsSource = new Subject<any> ();
  sessions$ = this.sessionsSource.asObservable ();

  private groupsSource = new Subject<any> ();
  groups$ = this.groupsSource.asObservable ();

  constructor(private http: HttpClient) {
    this.api = APPCONFIG.apiUrl + 'progesco-pedagogy/';
  }

  emitLevels(levels: any) {
    this.levelsSource.next (levels);
  }

  emitDepartments(departments: any) {
    this.departmentsSource.next (departments);
  }

  emitSpecialities(specialities: any) {
    this.specialitiesSource.next (specialities);
  }

  emitCourses(courses: any) {
    this.coursesSource.next (courses);
  }

  emitClassrooms(classrooms: any) {
    this.classroomsSource.next (classrooms);
  }

  emitSessions(sessions: any) {
    this.sessionsSource.next (sessions);
  }

  emitGroups(groups: any) {
    this.groupsSource.next (groups);
  }

  /************************************************************* LEVEL ********************************************************************/

  /**
   * Fonction permettant de récupérer la liste de tous les niveaux
   */
  getLevelList() {
    return this.http.get<any> (this.api + 'levels').pipe (map (data => {
      return data;
    }));
  }

  /**
   * Fonction permettant de créer un nouveau niveau
   * @param levelModel - Model niveau
   */
  addNewLevel(levelModel: LevelModel) {
    return this.http.post (this.api + 'levels', levelModel).pipe (map (data => {
      return data;
    }));
  }

  /**
   * Fonction de mise à jour d'un niveau
   * @param levelModel - Model niveau
   */
  updateLevel(levelModel: LevelModel) {
    return this.http.put (this.api + 'levels', levelModel).pipe (map (data => {
      return data;
    }));
  }

  /**
   * Allow to get level
   * @param id - Level ID
   */
  getLevel(id: number) {
    return this.http.get<any> (this.api + 'levels/' + id).pipe (map (data => {
      return data;
    }));
  }

  /************************************************************** SPECIALITY **************************************************************/

  getSpecialityList() {
    return this.http.get<any> (this.api + 'specialities').pipe (map (data => {
      return data;
    }));
  }

  getSpeciality(id: number) {
    return this.http.get<any> (this.api + 'specialities/' + id).pipe (map (data => {
      return data;
    }));
  }

  addNewSpeciality(specialityModel: SpecialityModel) {
    return this.http.post (this.api + 'specialities', specialityModel).pipe (map (data => {
      return data;
    }));
  }

  updateSpeciality(specialityModel: SpecialityModel) {
    return this.http.put (this.api + 'specialities', specialityModel).pipe (map (data => {
      return data;
    }));
  }

  /************************************************************* DEPARTMENT ***************************************************************/

  getDepartmentList() {
    return this.http.get<any> (this.api + 'departments').pipe (map (data => {
      return data;
    }));
  }

  getDepartment(id: number) {
    return this.http.get<any> (this.api + 'departments/' + id).pipe (map (data => {
      return data;
    }));
  }

  addNewDepartment(departmentModel: DepartmentModel) {
    return this.http.post (this.api + 'departments', departmentModel).pipe (map (data => {
      return data;
    }));
  }

  updateDepartment(departmentModel: DepartmentModel) {
    return this.http.put (this.api + 'departments', departmentModel).pipe (map (data => {
      return data;
    }));
  }

  /************************************************************* COURSES  *****************************************************************/
  getCourseList() {
    return this.http.get<any> (this.api + 'courses').pipe (map (data => {
      return data;
    }));
  }

  getCourse(id: number) {
    return this.http.get<any> (this.api + 'courses/' + id).pipe (map (data => {
      return data;
    }));
  }

  addNewCourse(courseModel: CourseModel) {
    return this.http.post (this.api + 'courses', courseModel).pipe (map (data => {
      return data;
    }));
  }

  updateCourse(courseModel: CourseModel) {
    return this.http.put (this.api + 'courses', courseModel).pipe (map (data => {
      return data;
    }));
  }

  /*********************************************************** CLASSROOM ******************************************************************/
  getClassroomList() {
    return this.http.get<any> (this.api + 'classrooms').pipe (map (data => {
      return data;
    }));
  }

  getClassroom(id: number) {
    return this.http.get<any> (this.api + 'classrooms/' + id).pipe (map (data => {
      return data;
    }));
  }

  addNewClassroom(classroomModel: ClassroomModel) {
    return this.http.post (this.api + 'classrooms', classroomModel).pipe (map (data => {
      return data;
    }));
  }

  updateClassroom(classroomModel: ClassroomModel) {
    return this.http.put (this.api + 'classrooms', classroomModel).pipe (map (data => {
      return data;
    }));
  }

  /************************************************* SESSION ******************************************************************************/
  getSessionList() {
    return this.http.get<any> (this.api + 'sessions').pipe (map (data => {
      return data;
    }));
  }

  getSession(id: number) {
    return this.http.get<any> (this.api + 'sessions/' + id).pipe (map (data => {
      return data;
    }));
  }

  addNewSession(sessionModel: SessionModel) {
    return this.http.post (this.api + 'sessions', sessionModel).pipe (map (data => {
      return data;
    }));
  }

  updateSession(sessionModel: SessionModel) {
    return this.http.put (this.api + 'sessions', sessionModel).pipe (map (data => {
      return data;
    }));
  }

  /************************************************************ GROUP *********************************************************************/
  /**
   * Retrieve a group
   * @param id - Group ID
   */
  getGroup(id: number) {
    return this.http.get<any> (this.api + 'groups/' + id).pipe (map (data => {
      return data;
    }));
  }

  /**
   * Return the complete list of groups
   * @param page - Page number
   */
  getGroups(page: number) {
    return this.http.get<any>(this.api + 'groups/page/' + page).pipe(map(data => {
      return data;
    }));
  }

  /**
   * Allow to add a new group
   * @param groupModel - GroupModel
   */
  addNewGroup(groupModel: GroupModel) {
    return this.http.post (this.api + 'groups', groupModel).pipe (map (data => {
      return data;
    }));
  }

  /**
   * Allow to update a group
   * @param groupModel - GroupModel
   */
  updateGroup(groupModel: GroupModel) {
    return this.http.put (this.api + 'groups', groupModel).pipe (map (data => {
      return data;
    }));
  }

  /**
   * Allow to delete a group
   * @param id - Group ID
   */
  deleteGroup(id: number) {
    return this.http.delete<any>(this.api + 'groups/' + id).pipe(map(data => {
      return data;
    }));
  }
}
