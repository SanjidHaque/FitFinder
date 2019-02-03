import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Job} from '../../../models/job.model';
import {JobService} from '../../../services/job.service';
import * as moment from 'moment';
import {SettingsService} from '../../../services/settings.service';
import {Source} from '../../../models/source.model';


@Component({
  selector: 'app-candidate-panel',
  templateUrl: './candidate-panel.component.html',
  styleUrls: ['./candidate-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePanelComponent implements OnInit {

  archivedChecked = false;
  favouriteChecked = false;

  selection = new SelectionModel<Candidate>(true, []);
  selectedValue = 'all';
  candidates: Candidate[] = [];
  jobs: Job[] = [];
  sources: Source[] = [];
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';



  constructor(private candidateService: CandidateService,
              private settingsService: SettingsService,
              private jobService: JobService) {}

  ngOnInit() {
    this.sources = this.settingsService.getAllSource();
    this.candidates = this.candidateService.getAllCandidate();
    this.jobs = this.jobService.getAllJob();
 }

  onValueChange(value: string) {
    this.selectedValue = value;
  }

  archiveStatus(event: any) {
    this.archivedChecked = event.checked;

  }


  favouriteStatus(event: any) {
    this.favouriteChecked = event.checked;
  }

  getJobName(candidate: Candidate) {
    return this.jobs.find(x => x.Id === candidate.JobId).JobTitle;
  }

  getApplicationDate(candidate: Candidate) {
    return moment(new Date(candidate.ApplicationDate)).format('Do MMMM, YYYY');
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


  getCandidateSource(candidate: Candidate) {
    return this.sources.find(x => x.Id === candidate.SourceId).Name;
  }

  getInterviewDate() {

  }
}
