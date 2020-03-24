import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Interview} from '../../../models/interview/interview.model';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {ConfirmationDialogComponent} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Data} from '@angular/router';
import {InterviewService} from '../../../services/shared-services/interview.service';
import {DialogService} from '../../../services/dialog-services/dialog.service';



@Component({
  selector: 'app-interview-panel',
  templateUrl: './interview-panel.component.html',
  styleUrls: ['./interview-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterviewPanelComponent implements OnInit {
  isDisabled = false;


  selectedValue = 'all';
  interviews: Interview[] = [];
  all = 'All';
  selectedDateFormatted = '';
  selectedDate = '';
  selection = new SelectionModel<Interview>(true, []);
  interviewTypes: any = [];

  constructor(private interviewDataStorageService: InterviewDataStorageService,
              private interviewService: InterviewService,
              private notifierService: NotifierService,
              private dialogService: DialogService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
          this.interviews = data['interviews'].interviews;
          this.interviewTypes = this.interviewService.getInterviewTypes();
        });
  }


  archiveInterviews() {
    this.dialogService.confirmationDialog(
      'Archive Interviews',
      'fas fa-archive',
      '400px',
      'warn',
      'Are you sure?',
      'Archive',
      false
    ).afterClosed().subscribe(result => {
        if (result.confirmationStatus) {

          let interviews: Interview[] = [];
          interviews = this.selection.selected;

          this.isDisabled = true;
          this.interviewDataStorageService.archiveInterviews(interviews)
            .subscribe((response: any) => {

                this.isDisabled = false;

                for (let i = 0; i < this.interviews.length; i++) {
                  for (let j = 0; j < interviews.length; j++) {
                    if (this.interviews[i].Id === interviews[j].Id)  {
                      this.interviews[i].IsArchived = true;
                    }
                  }
                }

                this.selection.clear();
                this.notifierService.notify('default', 'Archived successfully!')
              });
        }
      });
  }

  restoreInterviews() {
    this.dialogService.confirmationDialog(
      'Restore Interview',
      'far fa-window-restore',
      '400px',
      'warn',
      'Are you sure?',
      'Restore',
      false
    ).afterClosed().subscribe(result => {
        if (result.confirmationStatus) {

          let interviews: Interview[] = [];
          interviews = this.selection.selected;

          this.isDisabled = true;
          this.interviewDataStorageService.restoreInterviews(interviews)
            .subscribe((response: any) => {

              this.isDisabled = false;

                for (let i = 0; i < this.interviews.length; i++) {
                  for (let j = 0; j < interviews.length; j++) {
                    if (this.interviews[i].Id === interviews[j].Id)  {
                      this.interviews[i].IsArchived = false;
                    }
                  }
                }
                this.selection.clear();
                this.notifierService.notify('default', 'Restored successfully!')
              });
        }
      });
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
