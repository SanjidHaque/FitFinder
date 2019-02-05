import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../models/candidate.model';
import {CandidateService} from '../../services/candidate.service';
import {SelectionModel} from '@angular/cdk/collections';
import {InterviewService} from '../../services/interview.service';
import {Source} from '../../models/source.model';
import {SettingsService} from '../../services/settings.service';
import * as moment from 'moment';
import {Job} from '../../models/job.model';
import {JobService} from '../../services/job.service';

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


  constructor(private interviewService: InterviewService,
              private jobService: JobService,
              private candidateService: CandidateService,
              private settingsService: SettingsService) {}

  ngOnInit() {
    this.candidates = this.candidateService.getAllCandidate();
    this.sources = this.settingsService.getAllSource();
    this.jobs = this.jobService.getAllJob();
  }
  archiveStatus(event: any) {
    this.archivedChecked = event.checked;

  }

  getJobName(candidate: Candidate) {
    return this.jobs.find(x => x.Id === candidate.JobId).JobTitle;
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
