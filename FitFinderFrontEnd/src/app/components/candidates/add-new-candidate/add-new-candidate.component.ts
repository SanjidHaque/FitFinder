import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Candidate} from '../../../models/candidate/candidate.model';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import {DateAdapter} from '@angular/material';
import {ShortDateAdapter} from '../../../date-adapters/short-date.adapter';
import {CandidateEducation} from '../../../models/candidate/candidate-education.model';
import {CandidateExperience} from '../../../models/candidate/candidate-experience.model';
import {NotifierService} from 'angular-notifier';
import {CandidateAttachment} from '../../../models/candidate/canidate-attachment.model';
import {Job} from '../../../models/job/job.model';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';
import {Source} from '../../../models/settings/source.model';
import {JobAssignment} from '../../../models/candidate/job-assignment.model';
import {StageScore} from '../../../models/settings/stage-score.model';
import {CriteriaScore} from '../../../models/settings/criteria-score.model';
import {StageComment} from '../../../models/settings/stage-comment.model';


@Component({
  selector: 'app-add-new-candidate',
  templateUrl: './add-new-candidate.component.html',
  styleUrls: ['./add-new-candidate.component.css'],
  providers: [{provide: DateAdapter, useClass: ShortDateAdapter}]
})
export class AddNewCandidateComponent implements OnInit {

  startDateOfEducation = [];
  startDateOfExperience = [];
  candidateExperience: CandidateExperience[] = [];
  candidateEducation: CandidateEducation[] = [];
  candidateAttachments: CandidateAttachment[] = [];

  defaultSource = 'BdJobs';

  jobs: Job[] = [];
  sources: Source[] = [];

  filesToUpload: Array<File>;
  @ViewChild('fileUpload', {static: false}) fileUploadVar: any;
  isDisabled = false;

  addNewCandidateForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(private router: Router,
              private route: ActivatedRoute,
              private jobDataStorageService: JobDataStorageService,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService,
              private candidateDataStorageService: CandidateDataStorageService,
              private formBuilder: FormBuilder) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobs = data['jobs'];
          this.sources = data['sources'];
        }
      );

    this.addNewCandidateForm = new FormGroup({
      'jobId': new FormControl(''),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'mobile': new FormControl('', Validators.required),
      'address': new FormControl(''),
      'city': new FormControl('', Validators.required),
      'state': new FormControl(''),
      'country': new FormControl('', Validators.required),
      'candidateSourceId': new FormControl(this.defaultSource, Validators.required),
      'education': new FormArray([]),
      'experience': new FormArray([]),
      'facebookUrl': new FormControl(''),
      'linkedInUrl': new FormControl('')
    });
  }

  clearAllArrays() {
    this.candidateAttachments = [];
    this.candidateExperience = [];
    this.candidateEducation = [];
    this.startDateOfEducation = [];
    this.startDateOfExperience = [];
    this.filesToUpload = [];
  }

  fileChangeEvent(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      const fileName = fileInput.target.files[i].name.substr(0, fileInput.target.files[i].name.lastIndexOf('.'));
      const fileExtension = fileInput.target.files[i].name.split('.').pop();

      if (fileExtension === 'doc' || fileExtension === 'docx' || fileExtension === 'pdf') {
        const newFileName = fileName + Date.now() + '.' + fileExtension;
        const newFile = new File([fileInput.target.files[i]], newFileName, {type: fileInput.target.files[i].type});
        this.filesToUpload.push(newFile);
        const candidateAttachment = new CandidateAttachment(
          null, null, fileInput.target.files[i].name, newFile.name, false);
        this.candidateAttachments.push(candidateAttachment);
        this.notifierService.notify('default', 'File uploaded successfully');
      } else {
        this.notifierService.notify('default', 'Unsupported format!');
      }
    }
    this.fileUploadVar.nativeElement.value = '';
  }

  changeResume(index: number, value: any) {
    for (let i = 0; i < this.candidateAttachments.length; i++) {
      this.candidateAttachments[i].IsResume = false;
    }
    this.candidateAttachments[index].IsResume = value.checked;
  }

  getFile() {
    document.getElementById('choseFile').click();
  }

  removeAllSelectedFiles() {
    this.filesToUpload = [];
    this.fileUploadVar.nativeElement.value = '';
    this.candidateAttachments = [];
  }

  removeSelectedFiles(index: number) {
    this.candidateAttachments.splice(index, 1);
  }

  getStartDateOfEducation(date: string, index: number) {
    this.startDateOfEducation[index] = date;
  }

  getStartDateOfExperience(date: string, index: number) {
    this.startDateOfExperience[index] = date;

  }
  populateEducationFields() {
    return this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      instituteName: ['', Validators.required],
      result: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  addEducationFields() {

    // (this.addNewCandidateForm.get('education')['controls'] as FormArray)
    //   .push(this.populateEducationFields());

    (this.addNewCandidateForm.controls['education'] as FormArray)
      .push(this.populateEducationFields());
  }

  removeEducationFields(index: number) {
    (this.addNewCandidateForm.controls['education'] as FormArray).removeAt(index);
    this.startDateOfEducation.splice(index, 1);
  }

  populateExperienceFields() {
    return this.formBuilder.group({
      id: [],
      employerName: ['', Validators.required],
      designation: ['', Validators.required],
      role: [''],
      startDate: [''],
      endDate: [''],
      isCurrent: [false]
    });
  }


  addExperienceFields() {

    // (this.addNewCandidateForm.get('experience')['controls'] as FormArray)
    //   .push(this.populateExperienceFields());

    (this.addNewCandidateForm.controls['experience'] as FormArray)
      .push(this.populateExperienceFields());
  }

  removeExperienceFields(index: number) {
    (this.addNewCandidateForm.controls['experience'] as FormArray).removeAt(index);
  }

  getEmailErrorMessage() {
    return this.addNewCandidateForm.controls['email'].hasError('required') ? 'You must enter an email' :
      this.addNewCandidateForm.controls['email'].hasError('email') ? 'Not a valid email' :
        '';
  }

  addNewCandidate() {
   const jobId = this.addNewCandidateForm.controls['jobId'].value;
   const firstName = this.addNewCandidateForm.controls['firstName'].value;
   const lastName = this.addNewCandidateForm.controls['lastName'].value;
   const email = this.addNewCandidateForm.controls['email'].value;
   const mobile = this.addNewCandidateForm.controls['mobile'].value;
   const address = this.addNewCandidateForm.controls['address'].value;
   const city = this.addNewCandidateForm.controls['city'].value;
   const state = this.addNewCandidateForm.controls['state'].value;
   const country = this.addNewCandidateForm.controls['country'].value;
   const candidateSourceId = this.addNewCandidateForm.controls['candidateSourceId'].value;
   this.candidateEducation = this.addNewCandidateForm.controls['education'].value;
   this.candidateExperience = this.addNewCandidateForm.controls['experience'].value;
   const facebookUrl = this.addNewCandidateForm.controls['facebookUrl'].value;
   const linkedInUrl = this.addNewCandidateForm.controls['linkedInUrl'].value;
   const isArchived = false;
   const isHired = false;
   const isClosed = false;
   const applicationDate = new Date();

   for ( let i = 0; i < this.candidateAttachments.length; i++ ) {
     this.candidateAttachments[i].CandidateId = null;
     this.candidateAttachments[i].Id = null;
   }
   for ( let i = 0; i < this.candidateEducation.length; i++ ) {
     this.candidateEducation[i].CandidateId = null;
     this.candidateEducation[i].Id = null;
   }
   for ( let i = 0; i < this.candidateExperience.length; i++ ) {
     this.candidateExperience[i].CandidateId = null;
     this.candidateExperience[i].Id = null;
   }

   const jobAssigneds: JobAssignment[] = [];


   const candidate = new Candidate(
     null,
     firstName,
     lastName,
     email,
     mobile,
     address,
     city,
     state,
     country,
     candidateSourceId,
     this.candidateEducation,
     this.candidateExperience,
     this.candidateAttachments,
     jobAssigneds,
     facebookUrl,
     linkedInUrl,
     isArchived,
     isHired,
     isClosed,
     applicationDate.toString(),
     false
   );



   this.isDisabled = true;
   this.candidateDataStorageService.addNewCandidate(candidate)
     .subscribe(
       (data: any) => {
         if (data.statusText === 'Success') {

           this.candidateDataStorageService.uploadAttachments(this.filesToUpload)
             .subscribe(
               (response: any) => {


                 if (jobId !== '') {

                   this.jobDataStorageService.getJob(jobId)
                     .subscribe((job: Job) => {


                       const stageScores: StageScore[] = [];
                       const criteriaScores: CriteriaScore[] = [];
                       const stageComments: StageComment[] = [];
                       const stageComment = new StageComment(
                         null,
                         null,
                         job.Workflow.Pipelines[0].PipelineStage[0].Id,
                         data.candidate.Id,
                         jobId,
                         'Created from '
                       );

                       stageComments.push(stageComment);

                       for (let i = 0; i < job.Workflow.Pipelines.length; i++) {

                         for (let j = 0; j < job.Workflow.Pipelines[i].PipelineStage.length; j++) {

                           const stageScore = new StageScore(
                             null,
                             null,
                             0,
                             job.Workflow.Pipelines[i].PipelineStage[j].Id,
                             data.candidate.Id,
                             jobId
                           );
                           stageScores.push(stageScore);



                           job.Workflow.Pipelines[i].PipelineStage.forEach((x) => {

                             if (x.PipelineStageCriteria === null) {
                               x.PipelineStageCriteria = [];
                             }

                           });


                           for (let l = 0;
                                l < job.Workflow.Pipelines[i].
                                  PipelineStage[j].PipelineStageCriteria.length;
                                l++) {



                             const criteriaScore = new CriteriaScore(
                               null,
                               null,
                               0,
                               job.Workflow.Pipelines[i].PipelineStage[j].PipelineStageCriteria[l].Id,
                               data.candidate.Id,
                               jobId
                             );
                             criteriaScores.push(criteriaScore);


                           }



                         }
                       }
                       const jobAssigned = new JobAssignment(
                         null,
                         data.candidate.Id,
                         null,
                         jobId,
                         stageScores,
                         criteriaScores,
                         stageComments,
                         job.Workflow.Pipelines[0].PipelineStage[0].Id,
                         true
                       );

                       jobAssigneds.push(jobAssigned);


                       this.jobDataStorageService.jobAssigned(jobAssigned)
                         .subscribe(
                           (getJobAssigned: JobAssignment) => {



                             this.router.navigate(['/candidates/', data.candidate
                               .Id]);
                             this.notifierService.notify('default',
                               'New candidate added.');
                           });


                     });

                 } else {
                   this.router.navigate(['/candidates/', data.candidate
                     .Id]);
                   this.notifierService.notify('default',
                     'New candidate added.');
                 }




               });
         } else {
           this.isDisabled = false;
           this.notifierService.notify('default', 'Error! Something went wrong!');
         }
       }
     );

  }
}

