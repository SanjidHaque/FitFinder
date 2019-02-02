import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {JobService} from '../../services/job.service';
import {CandidateService} from '../../services/candidate.service';
import {InterviewService} from '../../services/interview.service';
import {Job} from '../../models/job.model';
import {Interview} from '../../models/interview.model';
import {Candidate} from '../../models/candidate.model';

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

  departments = [
    {id: 1, name: 'Accounts'},
    {id: 2, name: 'Finance'},
    {id: 3, name: 'Development'},
    {id: 4, name: 'Engineering'}
  ];
  sources = [
    {sourceId: 1, sourceName: 'BdJobs.com'},
    {sourceId: 2, sourceName: 'Email'},
    {sourceId: 3, sourceName: 'Facebook'},
    {sourceId: 4, sourceName: 'Internal'},
    {sourceId: 5, sourceName: 'Job is Job'},
    {sourceId: 6, sourceName: 'LinkedIn'},
    {sourceId: 7, sourceName: 'Simply Hired'},
    {sourceId: 8, sourceName: 'Website'}
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.candidates = data['candidates'];
          this.jobs = data['jobs'];
          this.interviews = data['interviews'];
          this.activeJobs = this.jobs.filter(x => x.IsArchived === false).length;
          this.activeCandidates = this.candidates.filter(x => x.JobId !== null).length;
          const department = {
            id: 0,
            name: 'All department'
          };
          this.departments.unshift(department);
        }
      );
  }


  selectValueChanged(departmentId: any) {
    if (departmentId === '0') {
      this.activeJobs = this.jobs.filter(x => x.IsArchived === false).length;
    } else {
      this.activeJobs = this.jobs
        .filter(
          x => x.
            DepartmentId === departmentId && x.IsArchived === false).length;
    }
  }

}
