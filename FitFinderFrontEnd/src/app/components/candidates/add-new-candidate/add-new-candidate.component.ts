import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataStorageService} from '../../../services/data-storage.service';



@Component({
  selector: 'app-add-new-candidate',
  templateUrl: './add-new-candidate.component.html',
  styleUrls: ['./add-new-candidate.component.css']
})
export class AddNewCandidateComponent implements OnInit {

  startDateOfEducation = [];
  startDateOfExperience = [];


  addNewCandidateForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  jobs = [
    'Senior Laravel Developer', 'UI/UX Designer', 'ASP.Net Developer',
    'React.js & Node.js Developer', 'Django and MongoDB Developer'
  ];

   sources = [
    'BdJobs.com', 'Email', 'Facebook', 'Internal',
     'LinkedIn', 'Job is Job', 'Simply Hired', 'Website'
  ];

  constructor(private router: Router,
              private dataStorageService: DataStorageService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.addNewCandidateForm = new FormGroup({
      'job': new FormControl(''),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'mobile': new FormControl(''),
      'address': new FormControl(''),
      'city': new FormControl('', Validators.required),
      'state': new FormControl(''),
      'country': new FormControl('', Validators.required),
      'candidateSource': new FormControl('', Validators.required),
      'education': new FormArray([]),
      'experience': new FormArray([]),
      'facebook': new FormControl(''),
      'linkedin': new FormControl('')
    });
  }

  getStartDateOfEducation(date: string, index: number) {
    this.startDateOfEducation[index] = date;
  }

  getStartDateOfExperience(date: string, index: number) {
    this.startDateOfExperience[index] = date;

  }
  populateEducationFields() {
    return this.formBuilder.group({
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
      employerName: ['', Validators.required],
      designation: ['', Validators.required],
      role: [''],
      startDate: [''],
      endDate: ['']
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
    console.log(this.addNewCandidateForm.value);
  }

}
