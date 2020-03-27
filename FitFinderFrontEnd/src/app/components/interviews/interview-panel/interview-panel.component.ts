import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Interview} from '../../../models/interview/interview.model';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
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

  selectedInterviewPeriod = 'All';
  selectedInterviewType = 'All';
  selectedDateFormatted = '';
  selectedDate = '';
  archivedSelected = false;

  interviews: Interview[] = [];
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
          this.interviewService.interviews = data['interviews'].interviews;
          this.interviews = this.interviewService.getAllInterview().filter(x => x.IsArchived == false);
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


  filterByArchived(event: any) {
    this.archivedSelected = event.checked;
    this.interviews = this.interviewService
      .filterByDate(this.selectedDate, this.archivedSelected, this.selectedInterviewType);
  }


  filterByDate(selectedDate: any) {
   this.selectedDateFormatted = moment(new Date(selectedDate)).format('ddd, Do MMMM, YYYY');
   this.interviews = this.interviewService
     .filterByDate(this.selectedDateFormatted, this.archivedSelected, this.selectedInterviewType);
  }


  filterByInterviewType(interviewType: string) {
    this.selectedInterviewType = interviewType;
    this.interviews = this.interviewService
      .filterByDate(this.selectedDate, this.archivedSelected, this.selectedInterviewType);
  }

  filterByInterviewPeriod(interviewPeriod: any) {
    this.selectedInterviewPeriod = interviewPeriod;
   }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.interviews.length;
    return numSelected === numRows;
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
