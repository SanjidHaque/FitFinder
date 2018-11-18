import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {Subscription} from 'rxjs/index';
import {CandidateService} from '../../../services/candidate.service';

@Component({
  selector: 'app-candidate-panel',
  templateUrl: './candidate-panel.component.html',
  styleUrls: ['./candidate-panel.component.css']
})
export class CandidatePanelComponent implements OnInit, OnDestroy {

  selectedValue = '';
  candidates: Candidate[] = [];
  subscription: Subscription;
  totalCandidates = 0;

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.selectedValue = 'all';
    this.candidates = this.candidateService.getAllCandidate();
    this.subscription = this.candidateService.candidatesChanged
      .subscribe(
        (candidates: Candidate[]) => {
          this.candidates = candidates;
        }
      );
    this.totalCandidates = this.candidates.length;
  }

   onValueChange(value: string) {
    this.selectedValue = value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
