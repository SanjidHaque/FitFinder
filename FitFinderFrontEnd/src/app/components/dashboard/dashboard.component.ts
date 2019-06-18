import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {JobDataStorageService} from '../../services/data-storage/job-data-storage.service';
import {CandidateDataStorageService} from '../../services/data-storage/candidate-data-storage.service';
import {InterviewDataStorageService} from '../../services/data-storage/interview-data-storage.service';
import {Job} from '../../models/job.model';
import {Interview} from '../../models/interview.model';
import {Candidate} from '../../models/candidate.model';
import {SettingsDataStorageService} from '../../services/data-storage/settings-data-storage.service';
import {Source} from '../../models/source.model';
import {Department} from '../../models/department.model';

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
          this.candidates = data['candidates'];
          this.jobs = data['jobs'];
          this.interviews = data['interviews'];
          this.departments = data['departments'];
          this.sources = data['sources'];

          this.activeJobs = this.jobs.filter(x => x.IsArchived === false).length;
          this.activeCandidates = this.candidates.filter(x => x.JobId !== null).length;
          const department = {
            Id: 0,
            Name: 'All Department'
          };
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
