import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
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

}
