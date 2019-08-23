import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {CandidateDataStorageService} from '../../../services/data-storage/candidate-data-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Job} from '../../../models/job.model';
import {JobDataStorageService} from '../../../services/data-storage/job-data-storage.service';
import * as moment from 'moment';
import {SettingsDataStorageService} from '../../../services/data-storage/settings-data-storage.service';
import {Source} from '../../../models/source.model';
import {NotifierService} from 'angular-notifier';
import {ConfirmationDialogComponent} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Data} from '@angular/router';


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



  constructor(private candidateDataStorageService: CandidateDataStorageService,
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private settingsDataStorageService: SettingsDataStorageService,
              private jobDataStorageService: JobDataStorageService) {}

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobs = data['jobs'];
          this.sources = data['sources'];
          this.candidates = data['candidates'];
        }
      );


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
      .subscribe(
        (response: any) => {
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Archive Candidates',
          iconClass: 'fas fa-archive',
          confirmationText: 'Are you sure?',
          buttonText: 'Archive',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          let candidates: Candidate[] = [];
          candidates = this.selection.selected;
          this.candidateDataStorageService.archiveCandidates(candidates)
            .subscribe(
              (response: any) => {
                for (let i = 0; i < this.candidates.length; i++) {
                 for (let j = 0; j < candidates.length; j++) {
                   if (this.candidates[i].Id === candidates[j].Id)  {
                     this.candidates[i].IsArchived = true;
                   }
                 }
                }
                this.selection.clear();
                this.notifierService.notify('default', 'Archived successfully!')
              }
            );
        }
      }
    );
  }

  restoreCandidates() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Restore Candidates',
          iconClass: 'far fa-window-restore',
          confirmationText: 'Are you sure?',
          buttonText: 'Restore',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          let candidates: Candidate[] = [];
          candidates = this.selection.selected;
          this.candidateDataStorageService.restoreCandidates(candidates)
            .subscribe(
              (response: any) => {
                for (let i = 0; i < this.candidates.length; i++) {
                  for (let j = 0; j < candidates.length; j++) {
                    if (this.candidates[i].Id === candidates[j].Id)  {
                      this.candidates[i].IsArchived = false;
                    }
                  }
                }
                this.selection.clear();
                this.notifierService.notify('default', 'Restored successfully!')
              }
            );
        }
      }
    );
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
    const lastIndex = candidate.JobAssigned.length - 1;

    const job = this.jobs.find(
      x => x.Id === candidate.JobAssigned[lastIndex].JobId);

    if (job === undefined) {
      return '';
    }

    return job.JobTitle;
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


  getCandidateSourceName(candidate: Candidate) {
    const source = this.sources.find(x => x.Id === candidate.SourceId);

    if (source === undefined) {
      return '';
    }
    return source.Name;
  }

  getInterviewDate() {

  }
}
