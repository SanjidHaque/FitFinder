import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatDialog} from '@angular/material';
import {LongDateAdapter} from '../../../date-adapters/long-date.adpater';
import {Candidate} from '../../../models/candidate/candidate.model';
import {
  SelectCandidatesDialogComponent
} from '../../../dialogs/select-candidates-for-interview-dialog/select-candidates-dialog.component';
import {Interview} from '../../../models/interview/interview.model';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Job} from '../../../models/job/job.model';
import {UserAccount} from '../../../models/settings/user-account.model';
import {InterviewService} from '../../../services/shared-services/interview.service';
import {noWhitespaceValidator} from '../../../custom-form-validators/no-white-space.validator';
import {UserAccountDataStorageService} from '../../../services/data-storage-services/user-account-data-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-new-interview',
  templateUrl: './add-new-interview.component.html',
  styleUrls: ['./add-new-interview.component.css'],
  providers: [{provide: DateAdapter, useClass: LongDateAdapter}]
})

export class AddNewInterviewComponent implements OnInit, OnDestroy {
  isDisabled = false;
  addNewInterviewForm: FormGroup;
  interviewName ='';

  selectedCandidatesForInterview: Candidate[] = [];
  jobs: Job[] = [];
  candidates: Candidate[] = [];
  userAccounts: UserAccount[] = [];
  interviewTypes: any = [];
  minDate: Date;
  imageFolderPath = '';

  constructor(private dialog: MatDialog,
              private interviewDataStorageService: InterviewDataStorageService,
              private interviewService: InterviewService,
              private router: Router,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private route: ActivatedRoute,
              private notifierService: NotifierService) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
          this.jobs = data['jobs'].jobs;
          this.candidates = data['candidates'].candidates;
          this.userAccounts = data['userAccounts'].userAccounts;
          this.interviewTypes = this.interviewService.getInterviewTypes();
          this.imageFolderPath = this.userAccountDataStorageService.imageFolderPath;

          this.selectedCandidatesForInterview = this.interviewService.selectedCandidatesForInterview;
          if (this.selectedCandidatesForInterview.length === 1) {
            this.interviewName = 'Interview of ' + this.selectedCandidatesForInterview[0].FirstName;
          }

          this.createNewInterviewForm();
          this.minDate = new Date();
        });
  }



  createNewInterviewForm() {
    this.addNewInterviewForm = new FormGroup({
      'date': new FormControl(new Date(moment().add(7, 'days').toLocaleString()), [Validators.required]),
      'name': new FormControl(this.interviewName, [Validators.required, noWhitespaceValidator]),
      'userAccounts': new FormControl('', Validators.required),
      'location': new FormControl('Dhaka, Bangladesh'),
      'startTime': new FormControl('10:00', Validators.required),
      'endTime': new FormControl('11:30', Validators.required),
      'interviewType': new FormControl(this.interviewTypes[0].Name, Validators.required)
    });
  }

  addNewInterview() {
    let interviewStartTime = this.addNewInterviewForm.controls['startTime'].value;
    interviewStartTime = this.interviewService.getTimeIn12HourFormat(interviewStartTime);

    let interviewEndTime = this.addNewInterviewForm.controls['endTime'].value;
    interviewEndTime = this.interviewService.getTimeIn12HourFormat(interviewEndTime);

    const interviewersForInterview = this.addNewInterviewForm.controls['userAccounts'].value;

    const interview = new Interview(
      null,
      this.addNewInterviewForm.controls['name'].value,
      this.addNewInterviewForm.controls['date'].value,
      this.addNewInterviewForm.controls['location'].value,
      interviewStartTime,
      interviewEndTime,
      this.addNewInterviewForm.controls['interviewType'].value,
      this.interviewService.getCandidatesForInterview(this.selectedCandidatesForInterview, null),
      this.interviewService.getInterviewersForInterview(interviewersForInterview),
      false,
      localStorage.getItem('userName'),
      null,
      null,
      0,
      0
    );
    this.isDisabled = true;
    this.interviewDataStorageService.addNewInterview(interview)
       .subscribe(
         (data: any) => {

           if (data.statusText !== 'Success') {
             this.isDisabled = false;
             this.notifierService.notify('default', data.statusText);
           } else {
             this.router.navigate(['/interviews/', data.interview.Id ]);
             this.notifierService.notify('default', 'New interview added.');
           }

         });
  }

  openSelectCandidatesDialog() {
    const dialogRef = this.dialog.open(SelectCandidatesDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '1000px',
        height: '100%',
        data:
          {
            candidates: this.candidates.filter(x => x.IsArchived === false)
          }
      });

    dialogRef.afterClosed().subscribe(selectedCandidates => {
      if (selectedCandidates !== '' ) {
        if (this.selectedCandidatesForInterview.length !== 0 ) {

          for (let j = 0; j < this.selectedCandidatesForInterview.length; j++) {
            for (let k = 0; k < selectedCandidates.length; k++) {
              if (selectedCandidates[k].Id ===
                this.selectedCandidatesForInterview[j].Id) {
                selectedCandidates.splice(k, 1);
              }
            }
          }

            this.selectedCandidatesForInterview =
             this.selectedCandidatesForInterview.concat(selectedCandidates);
        } else {
          this.selectedCandidatesForInterview = selectedCandidates;
        }
      }
    });
  }

  removeCandidatesFromInterview(index: number) {
    this.selectedCandidatesForInterview.splice(index, 1);
  }

  ngOnDestroy() {
    this.interviewService.selectedCandidatesForInterview = [];
    console.log('Destroyed!');
  }

}

