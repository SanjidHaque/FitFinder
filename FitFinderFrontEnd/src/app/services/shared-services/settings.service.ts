import { Injectable } from '@angular/core';
import {Department} from '../../models/settings/department.model';
import {Workflow} from '../../models/settings/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }



  defaultWorkflow: Workflow;

  getDefaultPipelines() {
    return this.defaultWorkflow.Pipelines.slice();
  }


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
