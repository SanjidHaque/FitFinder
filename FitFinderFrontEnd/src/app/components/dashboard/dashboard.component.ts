import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Job} from '../../models/job/job.model';
import {Interview} from '../../models/interview/interview.model';
import {Source} from '../../models/settings/source.model';
import {UserAccount} from '../../models/settings/user-account.model';
import * as moment from 'moment';
import {InterviewService} from '../../services/shared-services/interview.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  interviews: Interview[] = [];
  myUpcomingInterviews: Interview[] = [];
  allUpcomingInterviews: Interview[] = [];
  jobs: Job[] = [];
  sources: Source[] = [];

  currentUserName = '';

  constructor(private route: ActivatedRoute,
              private interviewService: InterviewService) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.jobs = data['jobs'].jobs;
      this.interviews = data['interviews'].interviews;
      this.sources = data['sources'].sources;
      this.currentUserName = localStorage.getItem('userName');

      this.jobs = this.jobs.filter(x => x.IsArchived === false);
      this.getMyUpcomingInterviews();
      this.getAllUpcomingInterviews();
    });
  }

  getMyUpcomingInterviews() {
    this.interviews.forEach( interview => {

      const startTimeIn24HourFormat  = this.interviewService
        .getTimeIn24HourFormat(interview.StartTime);

      const interviewStartTimeWithDate = new Date(new Date(interview.Date)
        .toDateString() + ' ' + startTimeIn24HourFormat);

      interview.InterviewersForInterview.forEach( interviewerForInterview => {
        if (interviewerForInterview.UserAccount.UserName === this.currentUserName
          && moment(new Date()).isBefore(interviewStartTimeWithDate)) {
          this.myUpcomingInterviews.push(interview);
        }
      });
    });

    this.myUpcomingInterviews.sort(function(a, b) {
      return (<any>new Date(a.Date) - <any>new Date(b.Date));
    });
  }

  getAllUpcomingInterviews() {
    this.interviews.forEach( interview => {

      const startTimeIn24HourFormat  = this.interviewService
        .getTimeIn24HourFormat(interview.StartTime);

      const interviewStartTimeWithDate = new Date(new Date(interview.Date)
        .toDateString() + ' ' + startTimeIn24HourFormat);

        if (moment(new Date()).isBefore(interviewStartTimeWithDate)) {
          this.allUpcomingInterviews.push(interview);
        }
    });

    this.allUpcomingInterviews.sort(function(a, b) {
      return (<any>new Date(a.Date) - <any>new Date(b.Date));
    });
  }

  getInterviewDay(interview: Interview) {
    return moment(new Date(interview.Date)).format('D');
  }

  getInterviewMonth(interview: Interview) {
    return moment(new Date(interview.Date)).format('MMM');
  }

  getInterviewYear(interview: Interview) {
    return moment(new Date(interview.Date)).format('YYYY');
  }

}
