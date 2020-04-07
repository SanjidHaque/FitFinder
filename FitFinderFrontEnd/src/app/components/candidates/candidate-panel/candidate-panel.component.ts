import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../../models/candidate/candidate.model';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Job} from '../../../models/job/job.model';
import * as moment from 'moment';
import {Source} from '../../../models/settings/source.model';
import {NotifierService} from 'angular-notifier';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Data} from '@angular/router';
import {DialogService} from '../../../services/dialog-services/dialog.service';
import {CandidateService} from '../../../services/shared-services/candidate.service';
import {UserAccountDataStorageService} from '../../../services/data-storage-services/user-account-data-storage.service';


@Component({
  selector: 'app-candidate-panel',
  templateUrl: './candidate-panel.component.html',
  styleUrls: ['./candidate-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePanelComponent implements OnInit {
  isDisabled = false;
  isFilterTouched = false;

  archivedSelected = false;
  favouriteSelected = false;
  selectedCandidateStatus = 'All';

  selection = new SelectionModel<Candidate>(true, []);
  imageFolderPath = '';

  candidates: Candidate[] = [];
  jobs: Job[] = [];

  constructor(private candidateDataStorageService: CandidateDataStorageService,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService,
              private candidateService: CandidateService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private dialogService: DialogService) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
          this.jobs = data['jobs'].jobs;
          this.candidateService.candidates = data['candidates'].candidates;
          this.candidates = this.candidateService
            .getAllCandidate()
            .filter(x => x.IsArchived === false);
          this.imageFolderPath = this.userAccountDataStorageService.imageFolderPath;
      });
  }



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
              console.log(this.candidates);
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

  filterByArchived(event: any) {
    this.isFilterTouched = true;
    this.archivedSelected = event.checked;
    this.candidates = this.candidateService.filterByArchived(
      this.archivedSelected, this.favouriteSelected);
    console.log(this.candidates);
  }

  filterByFavourite(event: any) {
    this.isFilterTouched = true;
    this.favouriteSelected = event.checked;
    this.candidates = this.candidateService.filterByArchived(
      this.archivedSelected, this.favouriteSelected);
  }

  getJobName(candidate: Candidate) {
    const lastIndex = candidate.JobAssignments.length - 1;

    const job = this.jobs.find(
      x => x.Id === candidate.JobAssignments[lastIndex].JobId);

    if (job === undefined) {
      return '';
    }

    return job.Title;
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
