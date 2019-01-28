import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate.service';
import * as moment from 'moment';
import {CandidateAttachment} from '../../../models/canidate-attachment.model';
import {CandidateEducation} from '../../../models/candidate-education.model';
import {CandidateExperience} from '../../../models/candidate-experience.model';

@Component({
  selector: 'app-candidate-id',
  templateUrl: './candidate-id.component.html',
  styleUrls: ['./candidate-id.component.css']
})
export class CandidateIdComponent implements OnInit {

  candidateId: string;
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';

  candidates: Candidate[] = [];
  candidate: Candidate;

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

  constructor(private route: ActivatedRoute,
              private router: Router,

              private candidateService: CandidateService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.candidateId = params['candidate-id'];
        }
      );

  }

  ngOnInit() {
    this.candidates = this.candidateService.getAllCandidate();
    this.candidate = this.candidates.find(x => x.Id === this.candidateId);
  }



  previousCandidate() {
    const currentIndex = this.candidates.findIndex(x => x.Id === this.candidateId);
    let nextIndex = currentIndex - 1;
    if ( nextIndex === -1 ) {
       nextIndex = this.candidates.length - 1;
    } else {
       nextIndex = currentIndex - 1;
    }
      this.candidate = this.candidates[nextIndex];
      this.candidateId = this.candidates[nextIndex].Id;
      this.router.navigate(['/candidates/' + this.candidateId]);
  }

  nextCandidate() {
    const currentIndex = this.candidates.findIndex(x => x.Id === this.candidateId);
    let nextIndex = currentIndex + 1;
    if ( nextIndex === this.candidates.length ) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
      this.candidate = this.candidates[nextIndex];
      this.candidateId = this.candidates[nextIndex].Id;
      this.router.navigate(['/candidates/' + this.candidateId]);
  }

  getApplicationDate() {
    return moment(new Date(this.candidate.ApplicationDate)).format('Do MMM YYYY');
  }
  getCandidateSource() {
    return this.sources.find(x => x.sourceId === this.candidate.CandidateSourceId).sourceName;
  }
  goToFacebookProfile() {
    window.open('http://' + this.candidate.FacebookUrl);
  }

  goToLinkedInProfile() {
    window.open('http://' + this.candidate.LinkedInUrl);
  }


  downloadFile(candidateAttachment: CandidateAttachment) {
    /*window.open('http://localhost:55586/Content/Attachments/' + candidateAttachment.ModifiedFileName);*/
    /*The above line will be comment out when working with back end.*/

    window.open('assets/cseregular3rd.pdf');
  }

  getStartMonthOfEducation(candidateEducation: CandidateEducation) {
    return moment(candidateEducation.StartDate).format('MMM');
  }

  getStartYearOfEducation(candidateEducation: CandidateEducation) {
    return moment(candidateEducation.StartDate).format('YYYY');
  }

  getEndMonthOfEducation(candidateEducation: CandidateEducation) {
    return moment(candidateEducation.EndDate).format('MMM');
  }

  getEndYearOfEducation(candidateEducation: CandidateEducation) {
    return moment(candidateEducation.EndDate).format('YYYY');
  }

  getStartMonthOfExperience(candidateExperience: CandidateExperience) {
    return moment(candidateExperience.StartDate).format('MMM');
  }

  getStartYearOfExperience(candidateExperience: CandidateExperience) {
    return moment(candidateExperience.StartDate).format('YYYY');
  }

  getEndMonthOfExperience(candidateExperience: CandidateExperience) {
    return moment(candidateExperience.EndDate).format('MMM');
  }

  getEndYearOfExperience(candidateExperience: CandidateExperience) {
    return moment(candidateExperience.EndDate).format('YYYY');
  }

}