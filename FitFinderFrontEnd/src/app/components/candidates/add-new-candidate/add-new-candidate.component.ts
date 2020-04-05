import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Candidate} from '../../../models/candidate/candidate.model';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import {DateAdapter} from '@angular/material';
import {ShortDateAdapter} from '../../../date-adapters/short-date.adapter';
import {NotifierService} from 'angular-notifier';
import {CandidateAttachment} from '../../../models/candidate/canidate-attachment.model';
import {Job} from '../../../models/job/job.model';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';
import {Source} from '../../../models/settings/source.model';
import {JobAssignment} from '../../../models/candidate/job-assignment.model';
import {AttachmentDataStorageService} from '../../../services/data-storage-services/attachment-data-storage.service';


@Component({
  selector: 'app-add-new-candidate',
  templateUrl: './add-new-candidate.component.html',
  styleUrls: ['./add-new-candidate.component.css'],
  providers: [{provide: DateAdapter, useClass: ShortDateAdapter}]
})
export class AddNewCandidateComponent implements OnInit {

  startDateOfEducation = [];
  startDateOfExperience = [];
  candidateAttachments: CandidateAttachment[] = [];

  sources: Source[] = [];
  jobs: Job[] = [];

  filesToUpload: Array<File>;
  @ViewChild('fileUpload', {static: false}) fileUploadVar: any;
  isDisabled = false;

  addNewCandidateForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private jobDataStorageService: JobDataStorageService,
              private settingsDataStorageService: SettingsDataStorageService,
              private attachmentDataStorageService: AttachmentDataStorageService,
              private notifierService: NotifierService,
              private candidateDataStorageService: CandidateDataStorageService,
              private formBuilder: FormBuilder) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.sources = data['sources'].sources;
          this.jobs = data['jobs'].jobs;
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
      'sourceId': new FormControl(this.sources[0].Id, Validators.required),
      'educations': new FormArray([]),
      'experiences': new FormArray([]),
      'facebookUrl': new FormControl(''),
      'linkedInUrl': new FormControl(''),
      'githubUrl': new FormControl('')
    });
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
          null,
          null,
          null,
          fileInput.target.files[i].name,
          newFile.name,
          false
        );

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
    (this.addNewCandidateForm.controls['educations'] as FormArray)
      .push(this.populateEducationFields());
  }

  removeEducationFields(index: number) {
    (this.addNewCandidateForm.controls['educations'] as FormArray).removeAt(index);
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
    (this.addNewCandidateForm.controls['experiences'] as FormArray)
      .push(this.populateExperienceFields());
  }

  removeExperienceFields(index: number) {
    (this.addNewCandidateForm.controls['experiences'] as FormArray).removeAt(index);
  }

  getEmailErrorMessage() {
    return this.addNewCandidateForm.controls['email'].hasError('required') ? 'You must enter an email' :
      this.addNewCandidateForm.controls['email'].hasError('email') ? 'Not a valid email' :
        '';
  }

  async addNewCandidate() {
    const jobId = this.addNewCandidateForm.controls['jobId'].value;
    const jobAssignments: JobAssignment[] = [];

    if (jobId !== '') {
      const jobAssignment = new JobAssignment(
        null,
        null,
        null,
        null,
        jobId,
        [],
        [],
        [],
        null,
        true,
      );
      jobAssignments.push(jobAssignment);
    }

    const candidate = new Candidate(
      null,
      this.addNewCandidateForm.controls['firstName'].value,
      this.addNewCandidateForm.controls['lastName'].value,
      this.addNewCandidateForm.controls['email'].value,
      this.addNewCandidateForm.controls['mobile'].value,
      this.addNewCandidateForm.controls['address'].value,
      this.addNewCandidateForm.controls['city'].value,
      this.addNewCandidateForm.controls['state'].value,
      this.addNewCandidateForm.controls['country'].value,
      null,
      this.addNewCandidateForm.controls['sourceId'].value,
      this.addNewCandidateForm.controls['educations'].value,
      this.addNewCandidateForm.controls['experiences'].value,
      this.candidateAttachments,
      jobAssignments,
      this.addNewCandidateForm.controls['facebookUrl'].value,
      this.addNewCandidateForm.controls['linkedInUrl'].value,
      this.addNewCandidateForm.controls['githubUrl'].value,
      false,
      false,
      false,
      new Date().toString(),
      false,
      '',
      null,
      null
    );


   this.isDisabled = true;
   if (this.filesToUpload.length !== 0) {

     await this.attachmentDataStorageService.uploadAttachments(this.filesToUpload)
       .subscribe(
         (data: any) => {
           if (data.statusText !== 'Success') {
             this.isDisabled = false;
             this.notifierService.notify('default', data.statusText);
             return;
           }
         });
   }



   this.candidateDataStorageService.addNewCandidate(candidate)
     .subscribe((data: any) => {

       if (data.statusText !== 'Success') {
         this.isDisabled = false;
         this.notifierService.notify('default', data.statusText);
       } else {
         this.router.navigate(['/candidates/', data.candidate.Id]);
         this.notifierService.notify('default', 'New candidate added.');
       }

     });

  }
}

