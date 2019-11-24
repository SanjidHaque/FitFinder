import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatDialog} from '@angular/material';
import {LongDateAdapter} from '../../../date-adapters/long-date.adpater';
import {Candidate} from '../../../models/candidate/candidate.model';
import {
  SelectCandidatesForInterviewDialogComponent
} from '../../../dialogs/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {CandidatesForInterview} from '../../../models/interview/candidates-for-interview.model';
import {InterviewersForInterview} from '../../../models/interview/interviewers-for-interview.model';
import {Interview} from '../../../models/interview/interview.model';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Job} from '../../../models/job/job.model';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import {Source} from '../../../models/settings/source.model';

@Component({
  selector: 'app-add-new-interview',
  templateUrl: './add-new-interview.component.html',
  styleUrls: ['./add-new-interview.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: DateAdapter, useClass: LongDateAdapter}]
})

export class AddNewInterviewComponent implements OnInit {

  addNewInterviewForm: FormGroup;
  candidates: Candidate[] = [];
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';
  isDisabled = false;


  selectedCandidatesForInterview: Candidate[]= [];

  sources: Source[] = [];


  jobs: Job[] = [];
  users = [
    {id: 1, userName: 'Yaha Juan', role: 'Super user'},
    {id: 2, userName: 'Cholo Han', role: 'HR'},
    {id: 3, userName: 'Kaytui Hyan', role: 'Team member'},
    {id: 4, userName: 'Kunisu Honda', role: 'Team member'},
    {id: 5, userName: 'Yahan Kawai', role: 'HR'},
    {id: 6, userName: 'Tatua Nokia', role: 'Team member'},
    {id: 7, userName: 'Vusimuji Momak', role: 'Team member'},
    {id: 8, userName: 'Wyengyu Duija', role: 'Team member'}
  ];

  interviewTypes = [
    {Type: 'Face to Face'},
    {Type: 'Telephonic'},
    {Type: 'Video Conference'},
    {Type: 'Group'},
    {Type: 'Panel'}
  ];

  constructor(private dialog: MatDialog,
              private interviewDataStorageService: InterviewDataStorageService,
              private candidateDataStorageService: CandidateDataStorageService,
              private jobDataStorageService: JobDataStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private notifierService: NotifierService) {
  }


  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobs = data['jobs'].jobs;
          this.candidates = data['candidates'].candidates;
          this.sources = data['sources'].sources;
        }
      );


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


  getJobTitle(jobId: number) {
    const job = this.jobs.find(x => x.Id === jobId);
    if (job === undefined) {
      return '';
    }
    return job.Title;
  }

  getCandidatesForInterview() {
    const candidatesForInterview: CandidatesForInterview[] = [];

    for (let i = 0; i < this.selectedCandidatesForInterview.length; i++) {
      const candidateForInterview =
        new CandidatesForInterview(
          null,
          null,
          null,
          null,
          this.selectedCandidatesForInterview[i].Id
        );
      candidatesForInterview.push(candidateForInterview);
    }
    return candidatesForInterview;
  }


  getInterviewersForInterview(interviewers: any[]) {
    const interviewersForInterview: InterviewersForInterview[] = [];

    for (let i = 0; i < interviewers.length; i++) {
      const interviewerForInterview =
        new InterviewersForInterview(
          null,
          null,
          null,
          null,
          interviewers[i].id
        );
      interviewersForInterview.push(interviewerForInterview);
    }
    return interviewersForInterview;
  }

  addNewInterview() {
    let interviewStartTime = this.addNewInterviewForm.controls['startTime'].value;
    interviewStartTime = this.getTimeWithAmOrPm(interviewStartTime);

    let interviewEndTime = this.addNewInterviewForm.controls['endTime'].value;
    interviewEndTime = this.getTimeWithAmOrPm(interviewEndTime);

    let interviewersForInterview = this.addNewInterviewForm.controls['interviewers'].value;
    interviewersForInterview = this.getInterviewersForInterview(interviewersForInterview);

    const interview = new Interview(
      null,
      this.addNewInterviewForm.controls['name'].value,
      this.addNewInterviewForm.controls['date'].value,
      this.addNewInterviewForm.controls['location'].value,
      interviewStartTime,
      interviewEndTime,
      this.addNewInterviewForm.controls['interviewType'].value,
      this.getCandidatesForInterview(),
      this.getInterviewersForInterview(interviewersForInterview),
      'Pending',
      false,
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

  getTimeWithAmOrPm(time: string) {
    const minutes = time.slice(3, 5);

    if (Number.parseInt(time.slice(0, 2)) > 12) {
      const hours = Number.parseInt(time.slice(0, 2)) - 12;
      const newTime = hours.toString() + ':' + minutes + ' PM';
      return newTime;
    } else if (Number.parseInt(time.slice(0, 2)) === 0) {
      const newTime = '12' + ':' + minutes + ' AM';
      return newTime;
    } else if (Number.parseInt(time.slice(0, 2)) === 12) {
      const newTime = '12' + ':' + minutes + ' PM';
      return newTime;
    } else {
      const newTime = time + ' AM';
      return newTime;
    }
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

