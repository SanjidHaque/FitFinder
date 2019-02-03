import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {JobService} from '../../services/job.service';
import {ActivatedRoute, Data} from '@angular/router';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private settingsService: SettingsService
              ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobService.jobs = data['jobs'];
          this.settingsService.departments = data['departments'];
          this.settingsService.sources = data['sources'];
          this.settingsService.jobFunctions = data['jobFunctions'];
          this.settingsService.jobTypes = data['jobTypes'];
        }
      );
  }

}
