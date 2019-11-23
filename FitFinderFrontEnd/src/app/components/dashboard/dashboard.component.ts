import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Job} from '../../models/job/job.model';
import {Interview} from '../../models/interview/interview.model';
import {Candidate} from '../../models/candidate/candidate.model';
import {SettingsDataStorageService} from '../../services/data-storage-services/settings-data-storage.service';
import {Source} from '../../models/settings/source.model';
import {Department} from '../../models/settings/department.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DashboardComponent implements OnInit {
  allDepartment = 0;

  candidates: Candidate[] = [];
  interviews: Interview[] = [];
  jobs: Job[] = [];
  activeJobs = 0;
  activeCandidates = 0;

  sources: Source[] = [];
  departments: Department[] = [];

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsDataStorageService
              ) { }

  ngOnInit() {

    this.route.data
      .subscribe(
        (data: Data) => {
          this.candidates = data['candidates'].candidates;
          this.jobs = data['jobs'].jobs;
          this.interviews = data['interviews'].interviews;
          this.departments = data['departments'].departments;
          this.sources = data['sources'].sources;

          this.activeJobs = this.jobs.filter(x => x.IsArchived === false).length;
        //  this.activeCandidates = this.candidates.filter(x => x.JobId !== null).length;
          const department = new Department(
            0,
            'All Department',
            null,
            null
          );
          this.departments.unshift(department);
        }
      );
  }


  selectValueChanged(departmentId: number) {
    if (departmentId === 0) {
      this.activeJobs = this.jobs.filter(x => x.IsArchived === false).length;
    } else {
      this.activeJobs = this.jobs
        .filter(
          x => x.
            DepartmentId === departmentId && x.IsArchived === false).length;
    }
  }

}
