import { Component, OnInit } from '@angular/core';
import {Candidate} from '../../../models/candidate/candidate.model';
import {Source} from '../../../models/settings/source.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {
  isDisabled = false;
  editCandidateForm: FormGroup;
  nonWhitespaceRegExp: RegExp = new RegExp('\\S');

  startDateOfEducation = [];
  startDateOfExperience = [];

  candidate: Candidate;
  sources: Source[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private candidateDataStorageService: CandidateDataStorageService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.candidate = data['candidate'].candidate;
        this.sources = data['sources'].sources;

        if (this.candidate.CandidateEducations === null) {
          this.candidate.CandidateEducations = [];
        }

        if (this.candidate.CandidateExperiences === null) {
          this.candidate.CandidateExperiences = [];
        }

        this.editCandidateForm = new FormGroup({
          'firstName': new FormControl(this.candidate.FirstName, Validators.required),
          'lastName': new FormControl(this.candidate.LastName),
          'email': new FormControl(this.candidate.Email, [Validators.required, Validators.email]),
          'mobile': new FormControl(this.candidate.Mobile, Validators.required),
          'address': new FormControl(this.candidate.Address),
          'city': new FormControl(this.candidate.City, Validators.required),
          'state': new FormControl(this.candidate.State),
          'country': new FormControl(this.candidate.Country, Validators.required),
          'sourceId': new FormControl(this.candidate.SourceId, Validators.required),
          'educations': new FormArray(this.candidate.CandidateEducations
            .map(item => {
              const group = this.populateEducationFields();
              group.patchValue(item);
              return group; })),
          'experiences': new FormArray(this.candidate.CandidateExperiences
            .map(item => {
              const group = this.populateExperienceFields();
              group.patchValue(item);
              return group; })),
          'facebookUrl': new FormControl(this.candidate.FacebookUrl),
          'linkedInUrl': new FormControl(this.candidate.LinkedInUrl, Validators.pattern(this.nonWhitespaceRegExp)),
          'githubUrl': new FormControl(this.candidate.GitHubUrl)
        });
      });
  }

  getEmailErrorMessage() {
    return this.editCandidateForm.controls['email']
      .hasError('required') ? 'You must enter an email' :
      this.editCandidateForm.controls['email']
        .hasError('email') ? 'Not a valid email' : '';
  }

  getStartDateOfEducation(date: string, index: number) {
    this.startDateOfEducation[index] = date;
  }

  getStartDateOfExperience(date: string, index: number) {
    this.startDateOfExperience[index] = date;
  }

  populateEducationFields() {
    return this.formBuilder.group({
      Id: [],
      CandidateId: [this.candidate.Id],
      Name: ['', Validators.required],
      InstituteName: ['', Validators.required],
      Result: [''],
      StartDate: [''],
      EndDate: ['']
    });
  }

  addEducationFields() {
    (this.editCandidateForm.controls['educations'] as FormArray)
      .push(this.populateEducationFields());
  }

  removeEducationFields(index: number) {
    (this.editCandidateForm.controls['educations'] as FormArray).removeAt(index);
    this.startDateOfEducation.splice(index, 1);
  }

  populateExperienceFields() {
    return this.formBuilder.group({
      Id: [],
      CandidateId: [this.candidate.Id],
      EmployerName: ['', Validators.required],
      Designation: ['', Validators.required],
      Role: [''],
      StartDate: [''],
      EndDate: [''],
      IsCurrent: [false]
    });
  }

  addExperienceFields() {
    (this.editCandidateForm.controls['experiences'] as FormArray)
      .push(this.populateExperienceFields());
  }

  removeExperienceFields(index: number) {
    (this.editCandidateForm.controls['experiences'] as FormArray).removeAt(index);
  }

  editCandidate () {

    const candidate = new Candidate(
      this.candidate.Id,
      this.editCandidateForm.controls['firstName'].value,
      this.editCandidateForm.controls['lastName'].value,
      this.editCandidateForm.controls['email'].value,
      this.editCandidateForm.controls['mobile'].value,
      this.editCandidateForm.controls['address'].value,
      this.editCandidateForm.controls['city'].value,
      this.editCandidateForm.controls['state'].value,
      this.editCandidateForm.controls['country'].value,
      null,
      this.editCandidateForm.controls['sourceId'].value,
      this.editCandidateForm.controls['educations'].value,
      this.editCandidateForm.controls['experiences'].value,
      [],
      [],
      this.editCandidateForm.controls['facebookUrl'].value,
      this.editCandidateForm.controls['linkedInUrl'].value,
      this.editCandidateForm.controls['githubUrl'].value,
      false,
      false,
      false,
      '',
      false,
      '',
      null,
      null
    );

    this.isDisabled = true;
    this.candidateDataStorageService.editCandidate(candidate)
      .subscribe((data: any) => {

        if (data.statusText !== 'Success') {
          this.isDisabled = false;
          this.notifierService.notify('default', data.statusText);
        } else {
          this.router.navigate(['/candidates/', this.candidate.Id]);
          this.notifierService.notify('default', 'Candidate updated successfully.');
        }

      });
  }

}
