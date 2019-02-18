import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Interview} from '../../../models/interview.model';
import {InterviewService} from '../../../services/interview.service';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {ConfirmationComponent} from '../../../dialogs/confirmation/confirmation.component';
import {Candidate} from '../../../models/candidate.model';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';



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

  constructor(private interviewService: InterviewService,
              private notifierService: NotifierService,
              private dataStorageService: DataStorageService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.interviews = this.interviewService.getAllInterview();
  }


  archiveInterviews() {
    const dialogRef = this.dialog.open(ConfirmationComponent,
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
          this.dataStorageService.archiveInterviews(interviews)
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
    const dialogRef = this.dialog.open(ConfirmationComponent,
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
          this.dataStorageService.restoreInterviews(interviews)
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

  getInterviewTypeName(interview: Interview) {
    return this.interviewTypes.find(x => x.id === interview.InterviewTypeId).type;
  }

  getInterviewDay(interview: Interview) {
    return moment(new Date(interview.InterviewDate)).format('Do');
  }

  getInterviewMonth(interview: Interview) {
    return moment(new Date(interview.InterviewDate)).format('MMMM');
  }

  getInterviewYear(interview: Interview) {
    return moment(new Date(interview.InterviewDate)).format('YYYY');
  }


}
