import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccount} from '../../../models/settings/user-account.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {InterviewService} from '../../../services/shared-services/interview.service';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {Interview} from '../../../models/interview/interview.model';
import {noWhitespaceValidator} from '../../../custom-form-validators/no-white-space.validator';
import {LongDateAdapter} from '../../../date-adapters/long-date.adpater';
import {DateAdapter} from '@angular/material';

@Component({
  selector: 'app-edit-interview',
  templateUrl: './edit-interview.component.html',
  styleUrls: ['./edit-interview.component.css'],
  providers: [{provide: DateAdapter, useClass: LongDateAdapter}]
})
export class EditInterviewComponent implements OnInit {
  isDisabled = false;
  editInterviewForm: FormGroup;

  interview: Interview;
  userAccounts: UserAccount[] = [];
  interviewTypes: any = [];

  constructor(private notifierService: NotifierService,
              private route: ActivatedRoute,
              private router: Router,
              private interviewService: InterviewService,
              private interviewDataStorageService: InterviewDataStorageService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.interview = data['interview'].interview;
        if (this.interview === null) {
          this.router.navigate(['/interviews']);
          this.notifierService.notify('default', 'Resource not found!');
        }

        this.userAccounts = data['userAccounts'].userAccounts;
        this.interviewTypes = this.interviewService.getInterviewTypes();
        this.createEditInterviewForm();
      });
  }

  createEditInterviewForm() {
    const startTime = this.interviewService.getTimeIn24HourFormat(this.interview.StartTime);
    const endTime = this.interviewService.getTimeIn24HourFormat(this.interview.EndTime);

    this.editInterviewForm = new FormGroup({
      'date': new FormControl(this.interview.Date, Validators.required),
      'name': new FormControl(this.interview.Name, noWhitespaceValidator),
      'userAccounts': new FormControl(this.userAccounts, Validators.required),
      'location': new FormControl(this.interview.Location, noWhitespaceValidator),
      'startTime': new FormControl(startTime, Validators.required),
      'endTime': new FormControl(endTime, Validators.required),
      'interviewType': new FormControl(this.interview.InterviewType, Validators.required)
    });
  }



  editInterview() {
    let interviewStartTime = this.editInterviewForm.controls['startTime'].value;
    interviewStartTime = this.interviewService.getTimeIn12HourFormat(interviewStartTime);

    let interviewEndTime = this.editInterviewForm.controls['endTime'].value;
    interviewEndTime = this.interviewService.getTimeIn12HourFormat(interviewEndTime);

    const interviewersForInterview = this.editInterviewForm.controls['userAccounts'].value;

    const interview = new Interview(
      this.interview.Id,
      this.editInterviewForm.controls['name'].value,
      this.editInterviewForm.controls['date'].value,
      this.editInterviewForm.controls['location'].value,
      interviewStartTime,
      interviewEndTime,
      this.editInterviewForm.controls['interviewType'].value,
      [],
      this.interviewService.getInterviewersForInterview(interviewersForInterview),
      false,
      '',
      null,
      null,
      null,
      null
    );
    this.isDisabled = true;
    this.interviewDataStorageService.editInterview(interview)
      .subscribe(
        (data: any) => {
          this.isDisabled = false;
          if (data.statusText !== 'Success') {
            this.notifierService.notify('default', data.statusText);
          } else {
            this.router.navigate(['/interviews/', this.interview.Id ]);
            this.notifierService.notify('default', 'Interview updated successfully.');
          }

        });
  }

}
