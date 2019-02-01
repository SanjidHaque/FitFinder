import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Job} from '../../../models/job.model';
import {JobService} from '../../../services/job.service';
import * as moment from 'moment';


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
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';

  sources = [
    {sourceId: 1, sourceName: 'BdJobs.com'},
    {sourceId: 2, sourceName: 'Email'},
    {sourceId: 3, sourceName: 'Facebook'},
    {sourceId: 4, sourceName: 'Internal'},
    {sourceId: 5, sourceName: 'Job is Job'},
    {sourceId: 6, sourceName: 'LinkedIn'},
    {sourceId: 7, sourceName: 'Simply Hired'},
    {sourceId: 8, sourceName: 'Website'}
  ];

  constructor(private candidateService: CandidateService,
              private jobService: JobService) {}

  ngOnInit() {
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
    return this.sources.find(x => x.sourceId === candidate.SourceId).sourceName;
  }

  getInterviewDate() {

  }
}
