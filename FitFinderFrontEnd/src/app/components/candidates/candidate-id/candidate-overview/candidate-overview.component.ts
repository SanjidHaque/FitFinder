import { Component, OnInit } from '@angular/core';
import {Candidate} from '../../../../models/candidate/candidate.model';
import {NotifierService} from 'angular-notifier';
import {CandidateService} from '../../../../services/shared-services/candidate.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {JobAssignmentDataStorageService} from '../../../../services/data-storage-services/job-assignment-data-storage.service';
import {GeneralComment} from '../../../../models/candidate/general-comment.model';

@Component({
  selector: 'app-candidate-overview',
  templateUrl: './candidate-overview.component.html',
  styleUrls: ['./candidate-overview.component.css']
})
export class CandidateOverviewComponent implements OnInit {
  isDisabled = false;

  noWhitespaceRegExp: RegExp = new RegExp('\\S');
  commentForm: FormGroup;

  candidate: Candidate;
  currentUserName = '';

  constructor(private notifierService: NotifierService,
              private candidateService: CandidateService,
              private jobAssignmentDataStorageService: JobAssignmentDataStorageService) { }

  ngOnInit() {
    this.candidate = this.candidateService.candidate;
    this.currentUserName = localStorage.getItem('userName');
    this.commentForm = new FormGroup({
      'comment' : new FormControl('', Validators.pattern(this.noWhitespaceRegExp))
    });
  }

  addGeneralComment() {
    const comment = this.currentUserName
      + '  added a comment, "'
      + this.commentForm.controls['comment'].value
      + '"';

    const generalComment = new GeneralComment(
      null,
      comment,
      null,
      this.candidateService.jobAssignment.Id
    );


    const generalComments: GeneralComment[] = [];
    generalComments.push(generalComment);

    this.isDisabled = true;
    this.jobAssignmentDataStorageService.addGeneralComment(generalComments)
      .subscribe((data: any) => {

        this.isDisabled = false;
        if (data.statusText !== 'Success') {

          this.notifierService.notify('default', data.statusText);

        } else {

          this.candidateService.jobAssignment.GeneralComments.unshift(generalComment);
          this.commentForm.reset();

        }
      });
  }
}
