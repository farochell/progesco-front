import { HttpClient }    from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map }           from 'rxjs/operators';
import { APPCONFIG }     from '../../constants/app-constants';
import { Injectable }    from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  error: any;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  /**
   * Permet de retourner les infos de l'utilisateur connecté
   */
  getUserInfo() {
    return this.http.get<any>(APPCONFIG.apiUrl + 'api/user').pipe(map(user => {
      return user;
    }));
  }

  /**
   * Permet de vérifier que l'utilisateur a bien un des roles défini en paramètre
   * @param roleNames: string
   */
  hasRole(roleNames: string[]) {
    let userInfo: any;
    let roles: any;
    let isFind = false;
    if (!(!this.cookieService.get('user') || 0 === this.cookieService.get('user').length)) {
      userInfo = JSON.parse(this.cookieService.get('user'));
      roles = userInfo.roles;
      // Parcours de la liste des roles à tester
      for (let i = 0; i < roleNames.length; i++) {
        isFind = _.find(roles, function (o: any) {
          if (o.roleName === roleNames[i]) {
            return true;
          }
        });
        if (typeof isFind !== 'undefined') {
          isFind = true;
          break;
        }
      }
    }

    return isFind;
  }
}
