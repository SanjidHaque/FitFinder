import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PipelineStage} from '../../models/pipeline-stage.model';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {

  pipelineStages: PipelineStage[] = [];
  currentStageName: string;

  constructor(
    public dialogRef: MatDialogRef<ChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    for (let i = 0; i < this.data.pipelines.length; i++) {
      for (let j = 0; j < this.data.pipelines[i].PipelineStage.length; j++) {
        this.pipelineStages.push(this.data.pipelines[i].PipelineStage[j]);
      }
    }
    this.currentStageName =
      this.pipelineStages[this.data.selectTab].Name;
  }

  tabChange(index: number) {
    this.currentStageName =
      this.pipelineStages[index].Name;
  }

  resetCriteriaMark() {

  }

  getStageMark() {

  }

  getCriteriaMark() {

  }




}
