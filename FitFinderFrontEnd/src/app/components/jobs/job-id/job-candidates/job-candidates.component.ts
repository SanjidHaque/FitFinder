import {Component, OnInit} from '@angular/core';

import {JobAssignment} from '../../../../models/candidate/job-assignment.model';
import {NotifierService} from 'angular-notifier';
import {JobDataStorageService} from '../../../../services/data-storage-services/job-data-storage.service';
import {JobService} from '../../../../services/shared-services/job.service';
import {Data, ActivatedRoute, Router} from '@angular/router';
import {CandidateService} from '../../../../services/shared-services/candidate.service';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {Candidate} from '../../../../models/candidate/candidate.model';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {CandidateDataStorageService} from '../../../../services/data-storage-services/candidate-data-storage.service';
import {DialogService} from '../../../../services/dialog-services/dialog.service';
import {Job} from '../../../../models/job/job.model';
import {PipelineStage} from '../../../../models/settings/pipeline-stage.model';
import {InterviewService} from '../../../../services/shared-services/interview.service';
import {SelectCandidatesDialogComponent} from '../../../../dialogs/select-candidates-for-interview-dialog/select-candidates-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {JobAssignmentDataStorageService} from '../../../../services/data-storage-services/job-assignment-data-storage.service';

@Component({
  selector: 'app-job-candidates',
  templateUrl: './job-candidates.component.html',
  styleUrls: ['./job-candidates.component.css']
})
export class JobCandidatesComponent implements OnInit {
  isDisabled = false;
  isFilterTouched = false;
  selection = new SelectionModel<Candidate>(true, []);

  archivedSelected = false;
  favouriteSelected = false;

  jobSpecificCandidates: Candidate[] = [];
  candidates: Candidate[] = [];
  pipelineStages: PipelineStage[] = [];
  job: Job;

  imageFolderPath = '';

  constructor(private notifierService: NotifierService,
              private dialogService: DialogService,
              private dialog: MatDialog,
              private jobDataStorageService: JobDataStorageService,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private candidateDataStorageService: CandidateDataStorageService,
              private jobAssignmentDataStorageService: JobAssignmentDataStorageService,
              private candidateService: CandidateService,
              private interviewService: InterviewService,
              private router: Router,
              private route: ActivatedRoute,
              private jobService: JobService) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.candidates = data['candidates'].candidates;
      this.candidateService.candidates = this.jobService.getAllJobSpecificCandidates();
      this.jobSpecificCandidates = this.candidateService
        .getAllCandidate()
        .filter(x => x.IsArchived === false);

      this.job = this.jobService.job;
      this.extractPipelineStages();
      this.imageFolderPath = this.userAccountDataStorageService.imageFolderPath;
    });
  }

  extractPipelineStages() {
    this.job.Workflow.Pipelines.forEach( pipeline => {
      pipeline.PipelineStages.forEach(pipelineStage => {
        this.pipelineStages.push(pipelineStage);
      });
    });
  }

  addNewInterview() {
    const archivedCandidates: Candidate[] = this.selection.selected
      .filter(x => x.IsArchived === true);

    if (archivedCandidates.length !== 0) {
      this.notifierService.notify('default', 'Archive candidates should be restored first!')
    }

    const candidates: Candidate[] = this.selection.selected
      .filter(x => x.IsArchived === false);

    if (candidates.length === 0) {
      return;
    }
    this.interviewService.selectedCandidatesForInterview = candidates;
    this.interviewService.jobId = this.job.Id;
    this.router.navigate(['/interviews/add-new-interview']);
  }

  getPipelineStageProperty(candidate: Candidate, propertyName: string) {
    const jobAssignment = candidate.JobAssignments
      .find(x => x.JobId === this.job.Id);

    if (jobAssignment === undefined) {

      if (propertyName === 'Name') {
        return 'Undefined';
      } else {
        return '#eee';
      }

    }

    const pipelineStage = this.pipelineStages
      .find(x => x.Id === jobAssignment.CurrentPipelineStageId);

    if (pipelineStage === undefined) {

      if (propertyName === 'Name') {
        return 'Undefined';
      } else {
        return '#eee';
      }

    }

    if (propertyName === 'Name') {
      return pipelineStage.Name;
    } else {
      return pipelineStage.Color;
    }
  }

  resetAllFilter() {
    this.isFilterTouched = false;
    this.archivedSelected = false;
    this.favouriteSelected = false;
    this.jobSpecificCandidates = this.candidateService.getAllCandidate()
      .filter(x => x.IsArchived === false);
  }

  filterByArchived(event: any) {
    this.isFilterTouched = true;
    this.archivedSelected = event.checked;
    this.jobSpecificCandidates = this.candidateService.filterByArchived(
      this.archivedSelected, this.favouriteSelected);
  }

  filterByFavourite(event: any) {
    this.isFilterTouched = true;
    this.favouriteSelected = event.checked;
    this.jobSpecificCandidates = this.candidateService.filterByArchived(
      this.archivedSelected, this.favouriteSelected);
  }


  goToCandidateDetail(candidate: Candidate) {
    const jobAssignmentId = candidate.JobAssignments
      .find(x => x.JobId === this.job.Id)
      .Id;

    this.router.navigate(['/candidates/', candidate.Id, jobAssignmentId]);
  }

  addNewCandidate() {
    this.jobService.jobId = this.job.Id;
    this.router.navigate(['/candidates/add-new-candidate']);
  }

  getUniqueCandidates() {
    const candidates = this.candidates
      .filter(x => x.IsArchived === false);

    const uniqueCandidates: Candidate[] = [];
    candidates.forEach(candidate => {

      const getUniqueCandidate = uniqueCandidates
        .find(x => x.Id === candidate.Id);

      const getJobCandidate =  this.jobSpecificCandidates
        .find(x => x.Id === candidate.Id);

      if ((getUniqueCandidate === undefined) && (getJobCandidate === undefined)) {
        uniqueCandidates.push(candidate);
      }
    });

    return uniqueCandidates;
  }

  addExistingCandidates() {
    const dialogRef = this.dialog.open(SelectCandidatesDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '1000px',
        height: '100%',
        data:
          {
            candidates: this.getUniqueCandidates(),
            showPipelineStage: false
          }
      });

    dialogRef.afterClosed().subscribe((selectedCandidates: any) => {

      if (selectedCandidates !== '') {
        selectedCandidates.forEach(selectedCandidate => {
          const jobAssignments: JobAssignment[] = [];
          const jobAssignment = new JobAssignment(
            null,
            null,
            selectedCandidate.Id,
            null,
            this.job.Id,
            [],
            [],
            [],
            null
          );

          jobAssignments.push(jobAssignment);
          selectedCandidate.JobAssignments = jobAssignments;
        });


        this.jobAssignmentDataStorageService.addJobAssignments(selectedCandidates)
          .subscribe((data: any) => {

            if (data.statusText !== 'Success') {
              this.notifierService.notify('default', data.statusText);
            } else {

              if (this.jobSpecificCandidates.length === 0) {
                this.jobSpecificCandidates = this.jobSpecificCandidates
                  .concat(data.candidates);
              } else {
                data.candidates.forEach(candidate => {
                  this.jobSpecificCandidates.unshift(candidate);
                });
              }

              this.notifierService.notify('default', 'Candidate Assigned Successfully!');
            }

          });
      }
    });

  }

  addCandidateFromResume() {}

  favouriteCandidates(candidate: Candidate) {
    const candidates: Candidate[] = [];
    candidates.push(candidate);
    this.candidateDataStorageService.favouriteCandidates(candidates)
      .subscribe(
        (response: any) => {
          for (let i = 0; i < this.jobSpecificCandidates.length; i++) {
            if (this.jobSpecificCandidates[i].Id === candidate.Id) {
              this.jobSpecificCandidates[i].IsFavourite = true;
            }
          }
          this.notifierService.notify('default', 'Added to favourites!')
        }
      );
  }

  unfavouriteCandidates(candidate: Candidate) {
    const candidates: Candidate[] = [];
    candidates.push(candidate);
    this.candidateDataStorageService.unfavouriteCandidates(candidates)
      .subscribe((response: any) => {
          for (let i = 0; i < this.jobSpecificCandidates.length; i++) {
            if (this.jobSpecificCandidates[i].Id === candidate.Id) {
              this.jobSpecificCandidates[i].IsFavourite = false;
            }
          }
          this.notifierService.notify('default', 'Removed from favourites!')
        }
      );
  }

  archiveCandidates() {
    this.dialogService.confirmationDialog(
      'Restore Candidates',
      'fas fa-archive',
      '400px',
      'warn',
      'Are you sure?',
      'Archive',
      false
    ).afterClosed().subscribe(result => {
      if (result.confirmationStatus) {

        let candidates: Candidate[] = this.selection.selected;
        candidates = candidates.filter(x => x.IsArchived === false);

        if (candidates.length === 0) {
          this.notifierService.notify('default', 'Already archived!');
          return;
        }

        this.isDisabled = true;
        this.candidateDataStorageService.archiveCandidates(candidates)
          .subscribe((response: any) => {
            this.isDisabled = false;

            if (!this.archivedSelected) {
              for (let i = 0; i < this.jobSpecificCandidates.length; i++) {
                for (let j = 0; j < candidates.length; j++) {
                  if (this.jobSpecificCandidates[i].Id === candidates[j].Id) {
                    this.jobSpecificCandidates.splice(i, 1);
                  }
                }
              }
            }

            this.candidateService.archiveCandidates(candidates);
            this.selection.clear();
            this.notifierService.notify('default', 'Archived successfully!');
          });
      }
    });
  }

  restoreCandidates() {
    this.dialogService.confirmationDialog(
      'Restore Candidates',
      'far fa-window-restore',
      '400px',
      'warn',
      'Are you sure?',
      'Restore',
      false
    ).afterClosed().subscribe(result => {
      if (result.confirmationStatus) {

        let candidates: Candidate[] = this.selection.selected;
        candidates = candidates.filter(x => x.IsArchived === true);

        if (candidates.length === 0) {
          this.notifierService.notify('default', 'Already restored!');
          return;
        }

        this.isDisabled = true;
        this.candidateDataStorageService.restoreCandidates(candidates)
          .subscribe((response: any) => {

            this.isDisabled = false;

            for (let i = 0; i < this.jobSpecificCandidates.length; i++) {
              for (let j = 0; j < candidates.length; j++) {
                if (this.jobSpecificCandidates[i].Id === candidates[j].Id)  {
                  this.jobSpecificCandidates[i].IsArchived = false;
                }
              }
            }

            this.candidateService.restoreCandidates(candidates);
            this.selection.clear();
            this.notifierService.notify('default', 'Restored successfully!')
          });
      }
    });
  }

  getApplicationDate(candidate: Candidate) {
    return moment(new Date(candidate.ApplicationDate)).format('Do MMMM, YYYY');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.jobSpecificCandidates.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.jobSpecificCandidates.forEach(row => this.selection.select(row));
  }
}

