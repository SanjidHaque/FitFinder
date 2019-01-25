import { Component, OnInit } from '@angular/core';
import {JobService} from '../../../services/job.service';
import {ActivatedRoute, Data} from '@angular/router';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {



  constructor(private settingsService: SettingsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.settingsService.pipelines = data['pipelines'];
        }
      );
  }

}
