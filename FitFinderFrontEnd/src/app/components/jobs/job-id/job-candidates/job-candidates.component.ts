import {Component, OnInit} from '@angular/core';

import {JobAssignment} from '../../../../models/candidate/job-assignment.model';
import {NotifierService} from 'angular-notifier';
import {JobDataStorageService} from '../../../../services/data-storage-services/job-data-storage.service';
import {JobService} from '../../../../services/shared-services/job.service';
import {Router} from '@angular/router';
import {CandidateService} from '../../../../services/shared-services/candidate.service';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {Candidate} from '../../../../models/candidate/candidate.model';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {CandidateDataStorageService} from '../../../../services/data-storage-services/candidate-data-storage.service';
import {DialogService} from '../../../../services/dialog-services/dialog.service';

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

  jobSpecificCandidates: JobAssignment[] = [];
  candidates: Candidate[] = [];

  imageFolderPath = '';

  constructor(private notifierService: NotifierService,
              private dialogService: DialogService,
              private jobDataStorageService: JobDataStorageService,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private candidateDataStorageService: CandidateDataStorageService,
              private candidateService: CandidateService,
              private router: Router,
              private jobService: JobService) {}

  ngOnInit() {
    this.jobSpecificCandidates = this.jobService.getAllJobSpecificCandidates();

    this.candidateService.candidates = this.extractCandidates(this.jobSpecificCandidates);
    this.candidates = this.candidateService
      .getAllCandidate()
      .filter(x => x.IsArchived === false);

    this.imageFolderPath = this.userAccountDataStorageService.imageFolderPath;
  }


  extractCandidates(jobAssignments: JobAssignment[]) {
    const candidates: Candidate[] = [];

    jobAssignments.forEach( jobAssignment => {
      if (jobAssignment.Candidate !== null) {
        candidates.push(jobAssignment.Candidate);
      }
    });

    return candidates;
  }


  resetAllFilter() {
    this.isFilterTouched = false;
    this.archivedSelected = false;
    this.favouriteSelected = false;
    this.jobSpecificCandidates = this.jobService
      .getAllJobSpecificCandidates()
      .filter(x => x.Candidate.IsArchived === false);
  }

  filterByArchived(event: any) {
    this.isFilterTouched = true;
    this.archivedSelected = event.checked;
    this.candidates = this.candidateService.filterByArchived(
      this.archivedSelected, this.favouriteSelected);
  }

  filterByFavourite(event: any) {
    this.isFilterTouched = true;
    this.favouriteSelected = event.checked;
    this.candidates = this.candidateService.filterByArchived(
      this.archivedSelected, this.favouriteSelected);
  }


  goToCandidateDetail(candidate: Candidate) {
    const jobAssignmentId = this.jobSpecificCandidates
      .find(x => x.Candidate.Id === candidate.Id)
      .Id;

    this.router.navigate(['/candidates/', candidate.Id, jobAssignmentId]);
  }

  addNewCandidate() {
    this.jobService.jobId = this.jobSpecificCandidates[0].JobId;
    this.router.navigate(['/candidates/add-new-candidate']);
  }

  addExistingCandidates() {}

  addCandidateFromResume() {}

  favouriteCandidates(candidate: Candidate) {
    const candidates: Candidate[] = [];
    candidates.push(candidate);
    this.candidateDataStorageService.favouriteCandidates(candidates)
      .subscribe(
        (response: any) => {
          for (let i = 0; i < this.candidates.length; i++) {
            if (this.candidates[i].Id === candidate.Id) {
              this.candidates[i].IsFavourite = true;
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
          for (let i = 0; i < this.candidates.length; i++) {
            if (this.candidates[i].Id === candidate.Id) {
              this.candidates[i].IsFavourite = false;
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
              for (let i = 0; i < this.candidates.length; i++) {
                for (let j = 0; j < candidates.length; j++) {
                  if (this.candidates[i].Id === candidates[j].Id) {
                    this.candidates.splice(i, 1);
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

            for (let i = 0; i < this.candidates.length; i++) {
              for (let j = 0; j < candidates.length; j++) {
                if (this.candidates[i].Id === candidates[j].Id)  {
                  this.candidates[i].IsArchived = false;
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
    const numRows = this.candidates.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.candidates.forEach(row => this.selection.select(row));
  }
}

