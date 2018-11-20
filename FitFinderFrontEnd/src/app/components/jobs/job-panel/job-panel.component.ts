import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Job} from '../../../models/job.model';
import {Subscription} from 'rxjs/index';
import {JobService} from '../../../services/job.service';

@Component({
  selector: 'app-job-panel',
  templateUrl: './job-panel.component.html',
  styleUrls: ['./job-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JobPanelComponent implements OnInit {

  selectedValue = '';
  jobs: Job[] = [];
  subscription: Subscription;
  totalJobs = 0;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.selectedValue = 'all';
    this.jobs = this.jobService.getAllJob();
    this.subscription = this.jobService.jobsChanged
      .subscribe(
        (jobs: Job[]) => {
          this.jobs = jobs;
        }
      );
    this.totalJobs = this.jobs.length;
  }

  onValueChange(value: string) {
    this.selectedValue = value;
  }
}
