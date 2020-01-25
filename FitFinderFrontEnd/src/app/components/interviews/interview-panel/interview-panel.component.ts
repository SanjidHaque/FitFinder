import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Interview} from '../../../models/interview/interview.model';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {ConfirmationDialogComponent} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {Candidate} from '../../../models/candidate/candidate.model';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Data} from '@angular/router';



@Component({
  selector: 'app-interview-panel',
  templateUrl: './interview-panel.component.html',
  styleUrls: ['./interview-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterviewPanelComponent implements OnInit {

  selectedValue = 'all';
  interviews: Interview[] = [];
  all = 'All';
  selectedDateFormatted = '';
  selectedDate = '';
  selection = new SelectionModel<Interview>(true, []);
  interviewTypes = [
    {id: 1, type: 'Face to Face'},
    {id: 2, type: 'Telephonic'},
    {id: 3, type: 'Video Conference'},
    {id: 4, type: 'Group'},
    {id: 5, type: 'Panel'}
  ];

  constructor(private interviewDataStorageService: InterviewDataStorageService,
              private notifierService: NotifierService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
          this.interviews = data['interviews'].interviews;
        });
  }


  archiveInterviews() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Archive Interviews',
          iconClass: 'fas fa-archive',
          confirmationText: 'Are you sure?',
          buttonText: 'Archive',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          let interviews: Interview[] = [];
          interviews = this.selection.selected;
          this.interviewDataStorageService.archiveInterviews(interviews)
            .subscribe(
              (response: any) => {
                for (let i = 0; i < this.interviews.length; i++) {
                  for (let j = 0; j < interviews.length; j++) {
                    if (this.interviews[i].Id === interviews[j].Id)  {
                      this.interviews[i].IsArchived = true;
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

  restoreInterviews() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Restore Interviews',
          iconClass: 'far fa-window-restore',
          confirmationText: 'Are you sure?',
          buttonText: 'Restore',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          let interviews: Interview[] = [];
          interviews = this.selection.selected;
          this.interviewDataStorageService.restoreInterviews(interviews)
            .subscribe(
              (response: any) => {
                for (let i = 0; i < this.interviews.length; i++) {
                  for (let j = 0; j < interviews.length; j++) {
                    if (this.interviews[i].Id === interviews[j].Id)  {
                      this.interviews[i].IsArchived = false;
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

  getDate(selectedDate: string) {
    const formattedDate = moment(new Date(selectedDate)).format('ddd, Do MMMM, YYYY');
    this.selectedDateFormatted = formattedDate;
  }

  onValueChange(value: string) {
    this.selectedValue = value;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.interviews.length;
    return numSelected === numRows;
  }

  selectValueChanged(value: any) {
    console.log(value);
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.interviews.forEach(row => this.selection.select(row));
  }

  getInterviewDay(interview: Interview) {
    return moment(new Date(interview.Date)).format('Do');
  }

  getInterviewMonth(interview: Interview) {
    return moment(new Date(interview.Date)).format('MMMM');
  }

  getInterviewYear(interview: Interview) {
    return moment(new Date(interview.Date)).format('YYYY');
  }


}
