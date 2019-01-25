import { Component, OnInit } from '@angular/core';
import {Pipeline} from '../../../../models/pipeline.model';
import {SettingsService} from '../../../../services/settings.service';
import {ActivatedRoute, Data} from '@angular/router';
import {PipelineStage} from '../../../../models/pipeline-stage.model';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit {

  pipelines: Pipeline[] = [];

  constructor(private sharedService: SettingsService) {}

  ngOnInit() {
   this.pipelines = this.sharedService.getAllPipeline();
  }

  getNameAndColor(pipelineStage: PipelineStage) {
    return pipelineStage.Name;
  }
}
