import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate.service';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {

  candidateId: string;
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';

  candidates: Candidate[] = [];
  candidate: Candidate;


  constructor(private route: ActivatedRoute,
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

  }

  nextCandidate() {
    const currentIndex = this.candidates.findIndex(x => x.Id === this.candidateId);
  }

}
