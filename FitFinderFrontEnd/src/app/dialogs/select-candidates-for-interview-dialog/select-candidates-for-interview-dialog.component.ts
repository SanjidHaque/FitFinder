import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../models/candidate/candidate.model';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {Job} from '../../models/job/job.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-select-candidates-for-interview',
  templateUrl: './select-candidates-for-interview-dialog.component.html',
  styleUrls: ['./select-candidates-for-interview-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCandidatesForInterviewDialogComponent implements OnInit {
  term: string;
  selectedValue = 'all';
  archivedChecked = false;
  favouriteChecked = false;
  candidateDefaultImage = 'assets/images/defaultImage.png';
  selection = new SelectionModel<Candidate>(true, []);

  candidates: Candidate[] = [];
  jobs: Job[] = [];

  constructor(public dialogRef: MatDialogRef<SelectCandidatesForInterviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.candidates = this.data.candidates;
    this.jobs = this.data.jobs;
  }

  archiveStatus(event: any) {
    this.archivedChecked = event.checked;
  }

  favouriteStatus(event: any) {
    this.favouriteChecked = event.checked;
  }

  onValueChange(value: string) {
    this.selectedValue = value;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.candidates.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.candidates.forEach(row => this.selection.select(row));
  }

  getJobName(candidate: Candidate) {
    if (candidate.JobAssignments === null) {
      return '';
    }

    const jobAssignment = candidate.JobAssignments.find(x => x.IsActive === true);
    if (jobAssignment === undefined) {
      return '';
    }

    const job = this.jobs.find(x => x.Id === jobAssignment.JobId);
    if (job === undefined) {
      return '';
    }

    return job.Title;
  }

  getApplicationDate(candidate: Candidate) {
    return moment(new Date(candidate.ApplicationDate)).format('Do MMMM, YYYY');
  }

}
