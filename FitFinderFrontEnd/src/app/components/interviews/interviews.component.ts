import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {InterviewService} from '../../services/interview.service';
import {ActivatedRoute, Data} from '@angular/router';
import {JobService} from '../../services/job.service';
import {CandidateService} from '../../services/candidate.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css'],
})
export class InterviewsComponent implements OnInit {

  constructor(private interviewService: InterviewService,
              private settingsService: SettingsService,
              private jobService: JobService,
              private candidateService: CandidateService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.interviewService.interviews = data['interviews'];
          this.candidateService.candidates = data['candidates'];
          this.jobService.jobs = data['jobs'];
          this.settingsService.sources = data['sources']        }
      );
  }

}
