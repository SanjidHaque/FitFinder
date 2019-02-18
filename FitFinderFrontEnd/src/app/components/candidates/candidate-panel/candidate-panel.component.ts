import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Job} from '../../../models/job.model';
import {JobService} from '../../../services/job.service';
import * as moment from 'moment';
import {SettingsService} from '../../../services/settings.service';
import {Source} from '../../../models/source.model';
import {NotifierService} from 'angular-notifier';
import {DataStorageService} from '../../../services/data-storage.service';
import {ConfirmationComponent} from '../../../dialogs/confirmation/confirmation.component';
import {MatDialog} from '@angular/material';


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
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private dataStorageService: DataStorageService,
              private settingsService: SettingsService,
              private jobService: JobService) {}

  ngOnInit() {
    this.sources = this.settingsService.getAllSource();
    this.candidates = this.candidateService.getAllCandidate();
    this.jobs = this.jobService.getAllJob();
 }

  favouriteCandidates(candidate: Candidate) {
    const candidates: Candidate[] = [];
    candidates.push(candidate);
    this.dataStorageService.favouriteCandidates(candidates)
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
    this.dataStorageService.unfavouriteCandidates(candidates)
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
    const dialogRef = this.dialog.open(ConfirmationComponent,
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
          this.dataStorageService.archiveCandidates(candidates)
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
    const dialogRef = this.dialog.open(ConfirmationComponent,
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
          this.dataStorageService.restoreCandidates(candidates)
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

    return this.jobs.find(
      x => x.Id === candidate.JobAssigned[lastIndex].JobId)
      .JobTitle;
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
