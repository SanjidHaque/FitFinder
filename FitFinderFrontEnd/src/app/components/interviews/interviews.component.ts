import { Component, OnInit } from '@angular/core';
import {InterviewService} from '../../services/interview.service';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  constructor(private interviewService: InterviewService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.interviewService.interviews = data['interviews'];
        }
      );
  }

}
