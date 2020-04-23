import { Component, OnInit } from '@angular/core';
import {CandidateForInterview} from '../../../../models/interview/candidate-for-interview.model';
import {CandidateService} from '../../../../services/shared-services/candidate.service';
import {Interview} from '../../../../models/interview/interview.model';
import * as moment from 'moment';
import {InterviewService} from '../../../../services/shared-services/interview.service';
import {Router} from '@angular/router';
import {Candidate} from '../../../../models/candidate/candidate.model';

@Component({
  selector: 'app-candidate-interview',
  templateUrl: './candidate-interview.component.html',
  styleUrls: ['./candidate-interview.component.css']
})
export class CandidateInterviewComponent implements OnInit {
  candidateSpecificInterviews: CandidateForInterview[] = [];
  candidate: Candidate;

  constructor(private candidateService: CandidateService,
              private router: Router,
              private interviewService: InterviewService) {}

  ngOnInit() {
    this.candidateSpecificInterviews = this.candidateService.getAllCandidateSpecificInterviews();
    this.candidate = this.candidateService.candidate;
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

  addNewInterview() {
    this.interviewService.selectedCandidateForInterview = this.candidateService.candidate;
    this.router.navigate(['/interviews/add-new-interview']);
  }

}
