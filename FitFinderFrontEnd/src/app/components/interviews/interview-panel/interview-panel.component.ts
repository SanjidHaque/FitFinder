import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Interview} from '../../../models/interview.model';
import {Subscription} from 'rxjs/index';
import {InterviewService} from '../../../services/interview.service';





@Component({
  selector: 'app-interview-panel',
  templateUrl: './interview-panel.component.html',
  styleUrls: ['./interview-panel.component.css'],
  providers: [
  ],
})
export class InterviewPanelComponent implements OnInit, OnDestroy, DoCheck {

  public selectedValue: string;
  interviews: Interview[] = [];
  subscription: Subscription;
  totalInterviews = 0;
  all = 'All';
  interviewStatuses = ['All', 'Single', 'Batch'];
  selectedDate = '';



  constructor(private interviewService: InterviewService) {}

  ngOnInit() {
    this.selectedValue = 'all';
    this.interviews = this.interviewService.getAllInterview();
    this.subscription = this.interviewService.interviewsChanged
      .subscribe(
        (interviews: Interview[]) => {
          this.interviews = interviews;
        }
      );
    this.totalInterviews = this.interviews.length;
  }

  ngDoCheck() {
  }


  onValueChange(value: string) {
    this.selectedValue = value;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
