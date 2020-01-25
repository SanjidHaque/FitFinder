import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatDialog} from '@angular/material';
import {LongDateAdapter} from '../../../date-adapters/long-date.adpater';
import {Candidate} from '../../../models/candidate/candidate.model';
import {
  SelectCandidatesForInterviewDialogComponent
} from '../../../dialogs/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {Interview} from '../../../models/interview/interview.model';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Job} from '../../../models/job/job.model';
import {Source} from '../../../models/settings/source.model';
import {UserAccount} from '../../../models/settings/user-account.model';
import {InterviewService} from '../../../services/shared-services/interview.service';

@Component({
  selector: 'app-add-new-interview',
  templateUrl: './add-new-interview.component.html',
  styleUrls: ['./add-new-interview.component.css'],
  providers: [{provide: DateAdapter, useClass: LongDateAdapter}]
})

export class AddNewInterviewComponent implements OnInit {

  isDisabled = false;
  addNewInterviewForm: FormGroup;
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';
  selectedCandidatesForInterview: Candidate[]= [];

  sources: Source[] = [];
  jobs: Job[] = [];
  candidates: Candidate[] = [];
  userAccounts: UserAccount[] = [];
  interviewTypes: any = [];

  constructor(private dialog: MatDialog,
              private interviewDataStorageService: InterviewDataStorageService,
              private interviewService: InterviewService,
              private router: Router,
              private route: ActivatedRoute,
              private notifierService: NotifierService) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
          this.jobs = data['jobs'].jobs;
          this.candidates = data['candidates'].candidates;
          this.sources = data['sources'].sources;
          this.userAccounts = data['userAccounts'].userAccounts;
          this.interviewTypes = this.interviewService.getInterviewTypes();
          this.createNewInterviewForm();
        });
  }


  createNewInterviewForm() {
    this.addNewInterviewForm = new FormGroup({
      'date': new FormControl('', Validators.required),
      'name': new FormControl(''),
      'userAccounts': new FormControl('', Validators.required),
      'location': new FormControl(''),
      'startTime': new FormControl('10:00', Validators.required),
      'endTime': new FormControl('11:30', Validators.required),
      'interviewType': new FormControl('', Validators.required)
    });
  }

  addNewInterview() {
    let interviewStartTime = this.addNewInterviewForm.controls['startTime'].value;
    interviewStartTime = this.interviewService.getTimeWithAmOrPm(interviewStartTime);

    let interviewEndTime = this.addNewInterviewForm.controls['endTime'].value;
    interviewEndTime = this.interviewService.getTimeWithAmOrPm(interviewEndTime);

    const interviewersForInterview = this.addNewInterviewForm.controls['userAccounts'].value;

    const interview = new Interview(
      null,
      this.addNewInterviewForm.controls['name'].value,
      this.addNewInterviewForm.controls['date'].value,
      this.addNewInterviewForm.controls['location'].value,
      interviewStartTime,
      interviewEndTime,
      this.addNewInterviewForm.controls['interviewType'].value,
      this.interviewService.getCandidatesForInterview(this.selectedCandidatesForInterview),
      this.interviewService.getInterviewersForInterview(interviewersForInterview),
      'Pending',
      false,
      localStorage.getItem('userName'),
      null,
      null
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
    const dialogRef = this.dialog.open(SelectCandidatesForInterviewDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '1000px',
        data:
          {
            candidates: this.candidates,
            jobs: this.jobs,
            sources: this.sources
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' ) {
        if (this.selectedCandidatesForInterview.length !== 0 ) {
            this.selectedCandidatesForInterview =
              Array.from(new Set(this.selectedCandidatesForInterview.concat(result)));
        } else {
          this.selectedCandidatesForInterview = result;
        }
      }
    });
  }

  removeCandidate(index: number) {
    this.selectedCandidatesForInterview.splice(index, 1);
  }

}

