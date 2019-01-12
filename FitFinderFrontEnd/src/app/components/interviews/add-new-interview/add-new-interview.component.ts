import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatDialog} from '@angular/material';
import {LongDateAdapter} from '../../../date-adapters/long-date.adpater';
import {Candidate} from '../../../models/candidate.model';
import {
  SelectCandidatesForInterviewDialogComponent
} from './select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {UUID} from 'angular2-uuid';
import {CandidatesForInterview} from '../../../models/candidates-for-interview.model';
import {InterviewersForInterview} from '../../../models/interviewers-for-interview.model';
import {Interview} from '../../../models/interview.model';
import {InterviewService} from '../../../services/interview.service';
import {Router} from '@angular/router';
import {DataStorageService} from '../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {Job} from '../../../models/job.model';
import {JobService} from '../../../services/job.service';
import {CandidateService} from '../../../services/candidate.service';

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

  jobs: Job[] = [];
  users = [
    {id: '1', userName: 'Yaha Juan', role: 'Super user'},
    {id: '2', userName: 'Cholo Han', role: 'HR'},
    {id: '3', userName: 'Kaytui Hyan', role: 'Team member'},
    {id: '4', userName: 'Kunisu Honda', role: 'Team member'},
    {id: '5', userName: 'Yahan Kawai', role: 'HR'},
    {id: '6', userName: 'Tatua Nokia', role: 'Team member'},
    {id: '7', userName: 'Vusimuji Momak', role: 'Team member'},
    {id: '8', userName: 'Wyengyu Duija', role: 'Team member'}
  ];

  interviewTypes = [
    {id: '1', type: 'Face to Face'},
    {id: '2', type: 'Telephonic'},
    {id: '3', type: 'Video Conference'},
    {id: '4', type: 'Group'},
    {id: '5', type: 'Panel'}
  ];

  constructor(private dialog: MatDialog,
              private interviewService: InterviewService,
              private jobService: JobService,
              private router: Router,
              private dataStorageService: DataStorageService,
              private notifierService: NotifierService) {
  }


  ngOnInit() {
    this.jobs = this.jobService.getAllJob();
    this.addNewInterviewForm = new FormGroup({
      'interviewDate': new FormControl('', Validators.required),
      'interviewName': new FormControl(''),
      'interviewers': new FormControl(''),
      'interviewLocation': new FormControl(''),
      'interviewStartTime': new FormControl('10:00', Validators.required),
      'interviewEndTime': new FormControl('11:30', Validators.required),
      'interviewTypeId': new FormControl('', Validators.required)
    });
  }

  getJobTitle(candidateJobId: string) {

    const jobTitle = this.jobs.find(x => x.Id === candidateJobId).JobTitle;
    if (!jobTitle) {
      return;
    }
    return jobTitle;
  }

  getCandidatesForInterview(interviewId: string) {
    const candidatesForInterview: CandidatesForInterview[] = [];

    for (let i = 0; i < this.candidates.length; i++) {
      const candidateForInterview =
        new CandidatesForInterview(UUID.UUID(), interviewId, this.candidates[i].Id);
      candidatesForInterview.push(candidateForInterview);
    }
    return candidatesForInterview;
  }

  getInterviewersForInterview(interviewId: string, interviewers: any[]) {
    const interviewersForInterview: InterviewersForInterview[] = [];

    for (let i = 0; i < interviewers.length; i++) {
      const interviewerForInterview =
        new InterviewersForInterview(UUID.UUID(), interviewId, interviewers[i].id  );
      interviewersForInterview.push(interviewerForInterview);
    }
    return interviewersForInterview;
  }

  onSubmitNewInterview() {
    const interviewId = UUID.UUID();
    const interviewDate = this.addNewInterviewForm.controls['interviewDate'].value;
    const interviewName = this.addNewInterviewForm.controls['interviewName'].value;
    const interviewLocation = this.addNewInterviewForm.controls['interviewLocation'].value;

    let interviewStartTime = this.addNewInterviewForm.controls['interviewStartTime'].value;
    interviewStartTime = this.getTimeWithAmOrPm(interviewStartTime);

    let interviewEndTime = this.addNewInterviewForm.controls['interviewEndTime'].value;
    interviewEndTime = this.getTimeWithAmOrPm(interviewEndTime);

    const interviewTypeId = this.addNewInterviewForm.controls['interviewTypeId'].value;
    const candidatesForInterview = this.getCandidatesForInterview(interviewId);

    let interviewersForInterview = this.addNewInterviewForm.controls['interviewers'].value;
    interviewersForInterview = this.getInterviewersForInterview(interviewId, interviewersForInterview);

    const interviewStatus = 'Pending';

    const interview = new Interview(
      interviewId,
      interviewDate,
      interviewName,
      interviewLocation,
      interviewStartTime,
      interviewEndTime,
      interviewTypeId,
      candidatesForInterview,
      interviewersForInterview,
      interviewStatus
    );

    console.log(interview);

    this.interviewService.addNewInterview(interview);
    this.notifierService.notify('default', 'New interview added');
    this.isDisabled = true;
    this.router.navigate(['/interviews']);
    /*this.dataStorageService.addNewCandidate(newCandidate)
       .subscribe(
         (data: any) => {
           this.candidates = [];
           this.addNewInterviewForm.reset();
           this.router.navigate(['/interviews']);
           this.notifierService.notify('default', 'New candidate added');
           133 no line'll be removed, when comment out this block.
         }
       );*/
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
        minHeight: '650px',
        maxHeight: '650px'
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' ) {
        if (this.candidates.length !== 0 ) {
            this.candidates =
              Array.from(new Set(this.candidates.concat(result)));
        } else {
          this.candidates = result;
        }
      }
    });
  }

  removeCandidate(index: number) {
    this.candidates.splice(index, 1);
  }


}

