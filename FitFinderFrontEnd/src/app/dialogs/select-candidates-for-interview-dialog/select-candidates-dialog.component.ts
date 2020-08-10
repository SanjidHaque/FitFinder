import {Component, Inject, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../models/candidate/candidate.model';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {Job} from '../../models/job/job.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CandidateService} from '../../services/shared-services/candidate.service';
import {UserAccountDataStorageService} from '../../services/data-storage-services/user-account-data-storage.service';
import {PipelineStage} from '../../models/settings/pipeline-stage.model';

@Component({
  selector: 'app-select-candidates-dialog',
  templateUrl: './select-candidates-dialog.component.html',
  styleUrls: ['./select-candidates-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCandidatesDialogComponent implements OnInit, OnDestroy {
  isDisabled = false;
  isFilterTouched = false;

  archivedSelected = false;
  favouriteSelected = false;
  selectedCandidateStatus = 'All';
  term: string;

  selection = new SelectionModel<Candidate>(true, []);
  imageFolderPath = '';

  candidates: Candidate[] = [];
  jobs: Job[] = [];

  constructor(public dialogRef: MatDialogRef<SelectCandidatesDialogComponent>,
              private candidateService: CandidateService,
              private userAccountDataStorageService: UserAccountDataStorageService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.candidateService.candidates  = this.data.candidates;
    this.candidates = this.candidateService.getAllCandidate()
      .filter(x => x.IsArchived === false);
    this.imageFolderPath = this.userAccountDataStorageService.imageFolderPath;
    this.jobs = this.data.jobs;
  }


  resetAllFilter() {
    this.isFilterTouched = false;
    this.archivedSelected = false;
    this.favouriteSelected = false;
    this.candidates = this.candidateService.getAllCandidate()
      .filter(x => x.IsArchived === false);
  }

  filterByActiveStatus(value: string) {
    this.selectedCandidateStatus = value;
  }

  filterByFavourite(event: any) {
    this.isFilterTouched = true;
    this.favouriteSelected = event.checked;
    this.candidates = this.candidateService.filterByArchived(
      this.archivedSelected, this.favouriteSelected);
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

  extractPipelineStages(job: Job) {
    const pipelineStages: PipelineStage[] = [];

    job.Workflow.Pipelines.forEach( pipeline => {
      pipeline.PipelineStages.forEach(pipelineStage => {
        pipelineStages.push(pipelineStage);
      });
    });

    return pipelineStages;
  }

  getPipelineStageProperty(candidate: Candidate, propertyName: string) {
    const pipelineStages = this.extractPipelineStages(this.data.job);
    const jobAssignment = candidate.JobAssignments
      .find(x => x.JobId === this.data.job.Id);

    if (jobAssignment === undefined) {

      if (propertyName === 'Name') {
        return 'Undefined';
      } else {
        return '#eee';
      }

    }

    const pipelineStage = pipelineStages
      .find(x => x.Id === jobAssignment.CurrentPipelineStageId);

    if (pipelineStage === undefined) {

      if (pipelineStage === undefined) {
        if (propertyName === 'Name') {
          return 'Undefined';
        } else {
          return '#eee';
        }
      }

    }

    if (propertyName === 'Name') {
      return pipelineStage.Name;
    } else {
      return pipelineStage.Color;
    }

  }

  getApplicationDate(candidate: Candidate) {
    return moment(new Date(candidate.ApplicationDate)).format('Do MMMM, YYYY');
  }

  ngOnDestroy() {
    this.candidates = [];
  }

}
