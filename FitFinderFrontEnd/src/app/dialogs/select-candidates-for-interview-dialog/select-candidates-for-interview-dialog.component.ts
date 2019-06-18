import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../models/candidate.model';
import {CandidateDataStorageService} from '../../services/data-storage/candidate-data-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {InterviewDataStorageService} from '../../services/data-storage/interview-data-storage.service';
import {Source} from '../../models/source.model';
import {SettingsDataStorageService} from '../../services/data-storage/settings-data-storage.service';
import * as moment from 'moment';
import {Job} from '../../models/job.model';
import {JobDataStorageService} from '../../services/data-storage/job-data-storage.service';

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

  sources: Source[] = [];
  jobs: Job[] = [];


  constructor(private interviewService: InterviewDataStorageService,
              private jobService: JobDataStorageService,
              private candidateService: CandidateDataStorageService,
              private settingsService: SettingsDataStorageService) {}

  ngOnInit() {
    this.candidates = this.candidateService.getAllCandidate();
    this.sources = this.settingsService.getAllSource();
    this.jobs = this.jobService.getAllJob();
  }
  archiveStatus(event: any) {
    this.archivedChecked = event.checked;

  }

  getJobName(candidate: Candidate) {
    const assignedJobId = candidate.JobAssigned.find(x => x.IsActive === true).JobId;
    return this.jobs.find(x => x.Id === assignedJobId).JobTitle;
  }

  getApplicationDate(candidate: Candidate) {
    return moment(new Date(candidate.ApplicationDate)).format('Do MMMM, YYYY');
  }

  getCandidateSource(candidate: Candidate) {
    return this.sources.find(x => x.Id === candidate.SourceId).Name;
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
