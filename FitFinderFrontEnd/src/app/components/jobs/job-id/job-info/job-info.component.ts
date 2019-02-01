import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {JobService} from '../../../../services/job.service';
import {Job} from '../../../../models/job.model';
import * as moment from 'moment';
import {CandidateAttachment} from '../../../../models/canidate-attachment.model';
import {JobAttachment} from '../../../../models/job-attachment.model';
import {NotifierService} from 'angular-notifier';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css']
})
export class JobInfoComponent implements OnInit, DoCheck {

  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';
  job: Job;
  filesToUpload: Array<File>;
  @ViewChild('fileUpload') fileUploadVar: any;


  departments = [
    {id: 1, name: 'Accounts'},
    {id: 2, name: 'Finance'},
    {id: 3, name: 'Development'},
    {id: 4, name: 'Engineering'}
  ];
  jobFunctionalities = [
    {id: 1, name: 'Research'},
    {id: 2, name: 'Sales'},
    {id: 3, name: 'Consulting'}
  ];
  employmentTypes = [
    {id: 1, name: 'Full Time'},
    {id: 2, name: 'Part Time'},
    {id: 3, name: 'Internship'}
  ];
  constructor(private jobService: JobService,
              private notifierService: NotifierService) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.job = this.jobService.job;

  }

  ngDoCheck() {
   this.job = this.jobService.job;
  }

  getJobDescription() {
    document.getElementById('job-description').innerHTML = this.job.JobDescription;
  }

  getImmediateSkill() {
    document.getElementById('job-immediate').innerHTML = this.job.JobImmediate;
  }

  getIntermediateSkill() {
    document.getElementById('job-intermediate').innerHTML = this.job.JobIntermediate;
  }

  getGoodToHaveSkill() {
    document.getElementById('job-good-to-have').innerHTML = this.job.JobGoodToHave;
  }


  getFile() {
    document.getElementById('choseFile').click();
  }

  fileChangeEvent(fileInput: any) {

    for (let i = 0; i < fileInput.target.files.length; i++) {
      const fileName = fileInput.target.files[i].name.substr(0, fileInput.target.files[i].name.lastIndexOf('.'));
      const fileExtension = fileInput.target.files[i].name.split('.').pop();
      if (fileExtension === 'pdf' || fileExtension === 'doc' || fileExtension === 'docx') {
        const newFileName = fileName + Date.now() + '.' + fileExtension;
        const newFile = new File([fileInput.target.files[i]], newFileName, {type: fileInput.target.files[i].type});
        this.filesToUpload.push(newFile);
        const jobAttachment = new JobAttachment(
          null, this.job.Id, fileInput.target.files[i].name, newFile.name);
        this.job.JobAttachment.push(jobAttachment);
        this.notifierService.notify('default', 'File uploaded successfully');
      } else {
        this.notifierService.notify('default', 'Unsupported file format!');

      }
    }
    this.filesToUpload = [];
    this.fileUploadVar.nativeElement.value = '';

  }

  downloadFile(jobAttachment: JobAttachment) {
    /*window.open('http://localhost:55586/Content/Attachments/' + jobAttachment.ModifiedFileName);*/
    /*The above line will be comment out when working with back end.*/

    window.open('assets/cseregular3rd.pdf');
  }
  getJobFunction() {
    return this.jobFunctionalities.find(  x => x.id === this.job.JobFunctionalityId).name;
  }
  getJobType() {
    return this.employmentTypes.find(  x => x.id === this.job.EmploymentTypeId).name;
  }
  getClosingDays() {
    const today = new Date();
    const closingDate = moment(new Date(this.job.JobClosingDate));
    return Math.ceil(closingDate.diff(today, 'days', true));

  }

  getDepartmentName() {
    return this.departments.find( x => x.id === this.job.DepartmentId).name;
  }

  getCreatedDate() {
    return moment(new Date(this.job.JobCreatedDate)).format('Do MMM YYYY')
  }

  getClosingDate() {
    return moment(new Date(this.job.JobClosingDate)).format('Do MMM YYYY')
  }

}
