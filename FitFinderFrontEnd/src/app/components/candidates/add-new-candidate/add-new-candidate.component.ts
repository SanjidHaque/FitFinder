import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataStorageService} from '../../../services/data-storage.service';
import {UUID} from 'angular2-uuid';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate.service';
import {DateAdapter} from '@angular/material';
import {ShortDateAdapter} from '../../../date-adapters/short-date.adapter';
import {CandidateEducation} from '../../../models/candidate-education.model';
import {CandidateExperience} from '../../../models/candidate-experience.model';
import {NotifierService} from 'angular-notifier';
import {CandidateAttachment} from '../../../models/canidate-attachment.model';
import {Job} from '../../../models/job.model';
import {JobService} from '../../../services/job.service';
import {SettingsService} from '../../../services/settings.service';
import {Source} from '../../../models/source.model';


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

  jobs: Job[] = [];
  sources: Source[] = [];

  filesToUpload: Array<File>;
  @ViewChild('fileUpload') fileUploadVar: any;
  isDisabled = false;

  addNewCandidateForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(private router: Router,
              private jobService: JobService,
              private settingsService: SettingsService,
              private dataStorageService: DataStorageService,
              private notifierService: NotifierService,
              private candidateService: CandidateService,
              private formBuilder: FormBuilder) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.sources = this.settingsService.getAllSource();
    this.jobs = this.jobService.getAllJob();

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
      'candidateSourceId': new FormControl('', Validators.required),
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
      const newFileName = fileName + Date.now() + '.' + fileExtension;
      const newFile = new File([fileInput.target.files[i]], newFileName, {type: fileInput.target.files[i].type});
      this.filesToUpload.push(newFile);
      const candidateAttachment = new CandidateAttachment(
         null, null, fileInput.target.files[i].name, newFile.name, false);
      this.candidateAttachments.push(candidateAttachment);
    }
    this.notifierService.notify('default', 'File uploaded successfully');
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
    (this.addNewCandidateForm.controls['education'] as FormArray).push(this.populateEducationFields());
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
    (this.addNewCandidateForm.controls['experience'] as FormArray).push(this.populateExperienceFields());
  }

  removeExperienceFields(index: number) {
    (this.addNewCandidateForm.controls['experience'] as FormArray).removeAt(index);
  }

  getEmailErrorMessage() {
    return this.addNewCandidateForm.controls['email'].hasError('required') ? 'You must enter an email' :
      this.addNewCandidateForm.controls['email'].hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmitNewCandidate() {
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

   const candidate = new Candidate(
     null,
     jobId,
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
     [],
     facebookUrl,
     linkedInUrl,
     isArchived,
     isHired,
     isClosed,
     applicationDate.toString(),
     false
   );



   this.isDisabled = true;
   this.dataStorageService.addNewCandidate(candidate)
     .subscribe(
       (data: any) => {
         console.log(data);
         this.dataStorageService.uploadAttachments(this.filesToUpload)
           .subscribe(
             (response: any) => {
               this.candidateService.addNewCandidate(candidate);
                this.clearAllArrays();
                this.addNewCandidateForm.reset();
                this.router.navigate(['/candidates']);
                this.notifierService.notify('default', 'New candidate added');

             }
           );
       }
     );

  }
}
