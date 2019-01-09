import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Job} from '../../../models/job.model';
import {Subscription} from 'rxjs/index';
import {JobService} from '../../../services/job.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTreeFlatDataSource} from '@angular/material';

@Component({
  selector: 'app-job-panel',
  templateUrl: './job-panel.component.html',
  styleUrls: ['./job-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JobPanelComponent implements OnInit {

  selectedValue = 'all';
  jobs: Job[] = [];
  selection = new SelectionModel<Job>(true, []);
  departments = [
    {id: '1', name: 'Accounts'},
    {id: '2', name: 'Finance'},
    {id: '3', name: 'Development'},
    {id: '4', name: 'Engineering'}
  ];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobs = this.jobService.getAllJob();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.jobs.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.jobs.forEach(row => this.selection.select(row));
  }

  onValueChange(value: string) {
    this.selectedValue = value;
  }
}
