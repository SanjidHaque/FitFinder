import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../models/candidate.model';
import {CandidateDataStorageService} from '../../services/data-storage-services/candidate-data-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {InterviewDataStorageService} from '../../services/data-storage-services/interview-data-storage.service';
import {Source} from '../../models/source.model';
import {SettingsDataStorageService} from '../../services/data-storage-services/settings-data-storage.service';
import * as moment from 'moment';
import {Job} from '../../models/job.model';
import {JobDataStorageService} from '../../services/data-storage-services/job-data-storage.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-select-candidates-for-interview',
  templateUrl: './select-candidates-for-interview-dialog.component.html',
  styleUrls: ['./select-candidates-for-interview-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCandidatesForInterviewDialogComponent implements OnInit {
  archivedChecked = false;
  favouriteChecked = false;
  candidates: Candidate[] = [];
  selectedValue = 'all';
  selection = new SelectionModel<Candidate>(true, []);
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';

  term: string;

  sources: Source[] = [];
  jobs: Job[] = [];


  constructor(public dialogRef: MatDialogRef<SelectCandidatesForInterviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private interviewService: InterviewDataStorageService,
              private jobService: JobDataStorageService,
              private candidateService: CandidateDataStorageService,
              private settingsService: SettingsDataStorageService) {}

  ngOnInit() {
    this.candidates = this.data.candidates;
    this.sources = this.data.sources;
    this.jobs = this.data.jobs;
  }
  archiveStatus(event: any) {
    this.archivedChecked = event.checked;

  }

  getJobName(candidate: Candidate) {

    if (candidate.JobAssigned === null) {
      return '';
    }

    const assignedJob = candidate.JobAssigned
      .find(x => x.IsActive === true);

    if (assignedJob === undefined) {
      return '';
    }

    const job = this.jobs.find(x => x.Id === assignedJob.JobId);

    if (job === undefined) {
      return '';
    }

    return job.JobTitle;
  }

  getApplicationDate(candidate: Candidate) {
    return moment(new Date(candidate.ApplicationDate)).format('Do MMMM, YYYY');
  }

  getCandidateSource(candidate: Candidate) {

    const source = this.sources.find(x => x.Id === candidate.SourceId);

    if (source === undefined) {
      return '';
    }

    return source.Name;

  }

  favouriteStatus(event: any) {
    this.favouriteChecked = event.checked;
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

  onValueChange(value: string) {
    this.selectedValue = value;
  }


}
