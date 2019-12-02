import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserAccount} from '../../models/settings/user-account.model';
import {Company} from '../../models/settings/company.model';
import {Role} from '../../models/settings/role.model';
import {ChangePassword} from '../../models/settings/change-password.model';
import {Job} from '../../models/job/job.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountDataStorageService {
  backEndPort = '55586';
  rootUrl = 'http://localhost:' + this.backEndPort;


  // rootUrl = 'http://18.190.19.146:4204/';

  constructor(private http: HttpClient) { }

  login(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    let reqHeader = new HttpHeaders();

    reqHeader = reqHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    reqHeader = reqHeader.append('No-Auth', 'True');

    return this.http.post(this.rootUrl + '/token', data, {headers: reqHeader});
  }


  roleMatch(allowedRoles: string[]) {
    const userRole: string[] = JSON.parse(localStorage.getItem('userRoles'));
    const isAllowed = allowedRoles.find(x => x === userRole[0]);

    if (isAllowed === undefined) {
      return false;
    }
    return true;
  }



  addNewUserAccount(userAccount: UserAccount) {
    return this.http.post<UserAccount[]>(this.rootUrl + '/api/AddNewUserAccount', userAccount);
  }

  editUserAccount(userAccount: UserAccount) {
    return this.http.put<UserAccount[]>(this.rootUrl + '/api/EditUserAccount', userAccount);
  }



  addNewCompany(company: Company) {
    return this.http.post<Company>(this.rootUrl + '/api/AddNewCompany', company);
  }

  getAllUserAccount() {
    return this.http.get<UserAccount[]>(this.rootUrl + '/api/GetAllUserAccount');
  }


  getUserAccount(userAccountId: string) {
    return this.http.get<UserAccount>(`${this.rootUrl + '/api/GetUserAccount'}/${userAccountId}`);
  }

  getCurrentUserAccount() {
    return this.http.get<UserAccount>(this.rootUrl + '/api/GetCurrentUserAccount');
  }


  getAllCompany() {
    return this.http.get<Company[]>(this.rootUrl + '/api/GetAllCompany');
  }

  getCompany() {
    return this.http.get<Company>(this.rootUrl + '/api/GetCompany');
  }

  editCompany(company: Company) {
    return this.http.put<Company>(this.rootUrl + '/api/EditCompany', company);
  }

  getAllRole() {
    return this.http.get<Role[]>(this.rootUrl + '/api/GetAllRole');
  }

  changeProfilePassword(changePassword: ChangePassword) {
    return this.http.post<ChangePassword>(this.rootUrl + '/api/ChangeProfilePassword', changePassword);
  }

  deleteCompany(company: Company) {
    return this.http.post<Company>(this.rootUrl + '/api/DeleteCompany', company);
  }

  deleteUserAccount(userAccountId: string) {
    return this.http.delete(`${this.rootUrl + '/api/DeleteUserAccount'}/${userAccountId}`);
  }

}
