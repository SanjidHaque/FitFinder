import { Injectable } from '@angular/core';
import {Pipeline} from '../models/pipeline.model';
import {JobType} from '../models/job-type.model';
import {Department} from '../models/department.model';
import {JobFunction} from '../models/job-function.model';
import {Source} from '../models/source.model';
import {Tag} from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  pipelines: Pipeline[] = [];
  jobTypes: JobType[] = [];
  jobFunctions: JobFunction[] = [];
  departments: Department[] = [];
  sources: Source[] = [];
  tags: Tag[] = [];

  constructor() {}

  getAllPipeline() {
    return this.pipelines.slice();
  }

  getAllJobFunction() {
    return this.jobFunctions.slice();
  }

  getAllDepartment() {
    return this.departments.slice();
  }

  getAllSource() {
    return this.sources.slice();
  }

  getAllTag() {
    return this.tags.slice();
  }

  getAllJobType() {
    return this.jobTypes.slice();
  }
}
