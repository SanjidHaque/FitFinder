import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrls: ['./job-openings.component.css']
})
export class JobOpeningsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsService) { }

  ngOnInit() {
    this.route.data.
      subscribe(
      (data: Data) => {
        this.settingsService.jobTypes = data['jobTypes'];
        this.settingsService.jobFunctions = data['jobFunctions'];
        this.settingsService.departments= data['departments'];
      }
    )
  }

}
