import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataStorageService} from '../../../services/data-storage.service';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {CandidateAttachment} from '../../../models/candidate-attachment.model';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate.service';
import {DateAdapter} from '@angular/material';
import {ShortDateAdapter} from '../../../date-adapters/short-date.adapter';
import {CandidateEducation} from '../../../models/candidate-education.model';
import {CandidateExperience} from '../../../models/candidate-experience.model';
import {NotifierService} from 'angular-notifier';


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

  filesToUpload: Array<File>;
  @ViewChild('fileUpload') fileUploadVar: any;
  isDisabled = false;

  addNewCandidateForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  jobs = [
    {jobId: '1', jobName: 'Senior Laravel Developer'},
    {jobId: '2', jobName: 'UI/UX Designer'},
    {jobId: '3', jobName: 'ASP.Net Developer'},
    {jobId: '4', jobName: 'React.js & Node.js Developer'},
    {jobId: '5', jobName: 'Django and MongoDB Developer'}
  ];

  sources = [
    {sourceId: '1', sourceName: 'BdJobs.com'},
    {sourceId: '2', sourceName: 'Email'},
    {sourceId: '3', sourceName: 'Facebook'},
    {sourceId: '4', sourceName: 'Internal'},
    {sourceId: '5', sourceName: 'Job is Job'},
    {sourceId: '6', sourceName: 'LinkedIn'},
    {sourceId: '7', sourceName: 'Simply Hired'},
    {sourceId: '8', sourceName: 'Website'}
   ];

  constructor(private router: Router,
              private dataStorageService: DataStorageService,
              private notifierService: NotifierService,
              private candidateService: CandidateService,
              private formBuilder: FormBuilder) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.addNewCandidateForm = new FormGroup({
      'jobId': new FormControl(''),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'mobile': new FormControl(''),
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
      console.log(this.filesToUpload);
      const candidateAttachment = new CandidateAttachment(
         '', '', fileInput.target.files[i].name, newFile.name, null);
      this.candidateAttachments.push(candidateAttachment);
    }
  }

  changeResume(index: number, value: any) {
    for (let i = 0; i < this.candidateAttachments.length; i++) {
      this.candidateAttachments[i].isResume = false;
    }
    this.candidateAttachments[index].isResume = value.checked;
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
   const candidateId = UUID.UUID();
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

   for ( let i = 0; i < this.candidateAttachments.length; i++ ) {
     this.candidateAttachments[i].candidateId = candidateId;
     this.candidateAttachments[i].id = UUID.UUID();
   }
   for ( let i = 0; i < this.candidateEducation.length; i++ ) {
     this.candidateEducation[i].candidateId = candidateId;
     this.candidateEducation[i].id = UUID.UUID();
   }
   for ( let i = 0; i < this.candidateExperience.length; i++ ) {
     this.candidateExperience[i].candidateId = candidateId;
     this.candidateExperience[i].id = UUID.UUID();
   }

   const newCandidate = new Candidate(
     candidateId, jobId, firstName, lastName, email, mobile, address,
     city, state, country, candidateSourceId, this.candidateEducation,
     this.candidateExperience, this.candidateAttachments,
     facebookUrl, linkedInUrl, isArchived, isHired, isClosed);

   this.candidateService.addNewCandidate(newCandidate);
   this.notifierService.notify('default', 'New candidate added');
   this.isDisabled = true;
   this.router.navigate(['/candidates']);
  /* this.dataStorageService.addNewCandidate(newCandidate)
     .subscribe(
       (data: any) => {
         console.log(data);
         this.dataStorageService.uploadCandidateAttachments(this.filesToUpload)
           .subscribe(
             (response: any) => {
                console.log(response);
                this.isDisabled = true;
                this.clearAllArrays();
                this.addNewCandidateForm.reset();
                this.router.navigate(['/candidates']);
                this.notifierService.notify('default', 'New candidate added');
             }
           );
       }
     );*/

  }
}

