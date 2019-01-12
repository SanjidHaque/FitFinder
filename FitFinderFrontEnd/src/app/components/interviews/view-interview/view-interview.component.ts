import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CandidateService} from '../../../services/candidate.service';
import {InterviewService} from '../../../services/interview.service';
import {Interview} from '../../../models/interview.model';

@Component({
  selector: 'app-view-interview',
  templateUrl: './view-interview.component.html',
  styleUrls: ['./view-interview.component.css']
})
export class ViewInterviewComponent implements OnInit {
  interviewId: string;
  pending = '1'
  interviews: Interview[] = [];
  interview: Interview;
  disableEmailInvites = false;

  interviewActions = [
    { Id: '1', Name: 'Pending' },
    { Id: '2', Name: 'Invited' },
    { Id: '3', Name: 'Confirmed' },
    { Id: '4', Name: 'Declined' }
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private interviewService: InterviewService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.interviewId = params['interview-id'];
        }
      );
  }

  ngOnInit() {
    this.interviews = this.interviewService.getAllInterview();
    this.interview = this.interviews.find(x => x.Id === this.interviewId);
  }

  selectValueChanged(value: any) {
    if (value === '3' || value === '4' ) {
      this.disableEmailInvites = true;
    } else {
      this.disableEmailInvites = false;
    }
  }

  previousInterview() {
    const currentIndex = this.interviews.findIndex(x => x.Id === this.interviewId);
    let nextIndex = currentIndex - 1;
    if ( nextIndex === -1 ) {
      nextIndex = this.interviews.length - 1;
    } else {
      nextIndex = currentIndex - 1;
    }
    this.interview = this.interviews[nextIndex];
    this.interviewId = this.interviews[nextIndex].Id;
    this.router.navigate(['/interviews/' + this.interviewId]);
  }

  nextInterview() {
    const currentIndex = this.interviews.findIndex(x => x.Id === this.interviewId);
    let nextIndex = currentIndex + 1;
    if ( nextIndex === this.interviews.length ) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
    this.interview = this.interviews[nextIndex];
    this.interviewId = this.interviews[nextIndex].Id;
    this.router.navigate(['/interviews/' + this.interviewId]);
  }


}
