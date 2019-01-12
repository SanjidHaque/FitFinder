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
  allDepartment = 'All Department';

  candidates: Candidate[] = [];
  interviews: Interview[] = [];
  jobs: Job[] = [];
  activeJobs = 0;

  departments = [
    {id: '1', name: 'Accounts'},
    {id: '2', name: 'Finance'},
    {id: '3', name: 'Development'},
    {id: '4', name: 'Engineering'}
  ];

  constructor(private candidateService: CandidateService,
              private interviewService: InterviewService,
              private jobService: JobService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.candidates = data['candidates'];
          this.jobs = data['jobs'];
          this.interviews = data['interviews'];
          this.activeJobs = this.jobs.filter(x => x.IsArchived === false).length;
        }
      );
  }

}
