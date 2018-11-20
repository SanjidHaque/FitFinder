import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataStorageService} from '../../../services/data-storage.service';

@Component({
  selector: 'app-add-new-candidate',
  templateUrl: './add-new-candidate.component.html',
  styleUrls: ['./add-new-candidate.component.css']
})
export class AddNewCandidateComponent implements OnInit {

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
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.addNewCandidateForm = new FormGroup({
      'job': new FormControl(null),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobile': new FormControl(null),
      'address': new FormControl(null),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null),
      'country': new FormControl(null, Validators.required),
      'candidateSource': new FormControl(null, Validators.required),
      'facebook': new FormControl(null),
      'linkedin': new FormControl(null)
    });
  }

  getErrorMessage() {
    return this.addNewCandidateForm.controls['email'].hasError('required') ? 'You must enter an email' :
      this.addNewCandidateForm.controls['email'].hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmitNewCandidate() {
    console.log(this.addNewCandidateForm);
  }

}
