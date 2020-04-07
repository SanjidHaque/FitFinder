import { Component, OnInit } from '@angular/core';
import {CandidateForInterview} from '../../../../models/interview/candidate-for-interview.model';
import {CandidateService} from '../../../../services/shared-services/candidate.service';

@Component({
  selector: 'app-candidate-interview',
  templateUrl: './candidate-interview.component.html',
  styleUrls: ['./candidate-interview.component.css']
})
export class CandidateInterviewComponent implements OnInit {
  candidateSpecificInterviews: CandidateForInterview[] = [];

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.candidateSpecificInterviews = this.candidateService.getAllCandidateSpecificInterviews();
    console.log(this.candidateSpecificInterviews);
  }

}
