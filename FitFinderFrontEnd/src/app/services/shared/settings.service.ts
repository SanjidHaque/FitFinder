import { Injectable } from '@angular/core';
import {Department} from '../../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getDepartmentName(departmentId: number, departments: Department[]) {
    if (departmentId === null) {
      return '';
    }

    const department = departments.find(x => x.Id === departmentId);

    if (department === undefined) {
      return '';
    }

    return department.Name;
  }

}
