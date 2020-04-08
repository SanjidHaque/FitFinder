import { Component, OnInit } from '@angular/core';
import {CandidateForInterview} from '../../../../models/interview/candidate-for-interview.model';
import {CandidateService} from '../../../../services/shared-services/candidate.service';
import {Interview} from '../../../../models/interview/interview.model';
import * as moment from 'moment';
import {InterviewService} from '../../../../services/shared-services/interview.service';

@Component({
  selector: 'app-candidate-interview',
  templateUrl: './candidate-interview.component.html',
  styleUrls: ['./candidate-interview.component.css']
})
export class CandidateInterviewComponent implements OnInit {
  candidateSpecificInterviews: CandidateForInterview[] = [];
  upcomingInterviews: CandidateForInterview[] = [];

  constructor(private candidateService: CandidateService,
              private interviewService: InterviewService) {}

  ngOnInit() {
    this.candidateSpecificInterviews = this.candidateService.getAllCandidateSpecificInterviews();
    this.getUpcomingInterviews(this.candidateSpecificInterviews);
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

  getBackgroundColor(interviewStatus: string) {
    if (interviewStatus === 'Confirmed') {
      return '#37a6b4';
    } else if (interviewStatus === 'Pending') {
      return '#2574ab';
    } else if (interviewStatus === 'Declined') {
      return '#d35d5b';
    } else {
      return '#e7b36a';
    }
  }

  getUpcomingInterviews(candidateForInterviews: CandidateForInterview[]) {

    candidateForInterviews.forEach(candidateForInterview => {
      const startTimeIn24HourFormat  = this.interviewService
        .getTimeIn24HourFormat(candidateForInterview.Interview.StartTime);

      const interviewStartTimeWithDate =
        new Date(new Date(candidateForInterview.Interview.Date)
          .toDateString() + ' ' + startTimeIn24HourFormat);

      if (moment(new Date()).isBefore(interviewStartTimeWithDate)
        && candidateForInterview.InterviewStatus === 'Confirmed') {
        this.upcomingInterviews.push(candidateForInterview);
      }
    });

  }

}
