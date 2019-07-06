import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatDialog} from '@angular/material';
import {LongDateAdapter} from '../../../date-adapters/long-date.adpater';
import {Candidate} from '../../../models/candidate.model';
import {
  SelectCandidatesForInterviewDialogComponent
} from '../../../dialogs/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {CandidatesForInterview} from '../../../models/candidates-for-interview.model';
import {InterviewersForInterview} from '../../../models/interviewers-for-interview.model';
import {Interview} from '../../../models/interview.model';
import {InterviewDataStorageService} from '../../../services/data-storage/interview-data-storage.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Job} from '../../../models/job.model';
import {JobDataStorageService} from '../../../services/data-storage/job-data-storage.service';
import {CandidateDataStorageService} from '../../../services/data-storage/candidate-data-storage.service';

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
    {id: 1, type: 'Face to Face'},
    {id: 2, type: 'Telephonic'},
    {id: 3, type: 'Video Conference'},
    {id: 4, type: 'Group'},
    {id: 5, type: 'Panel'}
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
          this.jobs = data['jobs'];
          this.candidates = data['candidates'];
        }
      );


    this.addNewInterviewForm = new FormGroup({
      'interviewDate': new FormControl('', Validators.required),
      'interviewName': new FormControl(''),
      'interviewers': new FormControl('', Validators.required),
      'interviewLocation': new FormControl(''),
      'interviewStartTime': new FormControl('10:00', Validators.required),
      'interviewEndTime': new FormControl('11:30', Validators.required),
      'interviewTypeId': new FormControl('', Validators.required)
    });
  }


  getJobTitle(candidateJobId: number) {

    const job = this.jobs.find(x => x.Id === candidateJobId);
    if (job === undefined) {
      return '';
    }
    return job.JobTitle;
  }

  getCandidatesForInterview(interviewId: number) {
    const candidatesForInterview: CandidatesForInterview[] = [];

    for (let i = 0; i < this.candidates.length; i++) {
      const candidateForInterview =
        new CandidatesForInterview(null, interviewId, this.candidates[i].Id);
      candidatesForInterview.push(candidateForInterview);
    }
    return candidatesForInterview;
  }

  getInterviewersForInterview(interviewId: number, interviewers: any[]) {
    const interviewersForInterview: InterviewersForInterview[] = [];

    for (let i = 0; i < interviewers.length; i++) {
      const interviewerForInterview =
        new InterviewersForInterview(null, interviewId, interviewers[i].id  );
      interviewersForInterview.push(interviewerForInterview);
    }
    return interviewersForInterview;
  }

  onSubmitNewInterview() {
    const interviewId = null;
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
    const isArchived = false;

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
      1,
      isArchived
    );
    this.isDisabled = true;
    this.interviewDataStorageService.addNewInterview(interview)
       .subscribe(
         (data: any) => {

                 this.candidates = [];
                 this.addNewInterviewForm.reset();

                 this.router.navigate(['/interviews/', data.Id ]);
                 this.notifierService.notify('default', 'New interview added.');


         }
       );
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
        width: '1000px'
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

