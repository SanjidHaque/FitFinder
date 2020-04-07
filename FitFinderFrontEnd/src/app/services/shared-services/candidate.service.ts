import { Injectable } from '@angular/core';
import {Candidate} from '../../models/candidate/candidate.model';

import {UserAccountDataStorageService} from '../data-storage-services/user-account-data-storage.service';
import {CandidateForInterview} from '../../models/interview/candidate-for-interview.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  candidate: Candidate;
  candidates: Candidate[] = [];
  candidateSpecificInterviews: CandidateForInterview[] = [];

  getAllCandidate() {
    return this.candidates.slice();
  }

  getAllCandidateSpecificInterviews() {
    return this.candidateSpecificInterviews.slice();
  }



  filterByArchived(archivedSelected: boolean, favouriteSelected: boolean) {
    let candidates = this.candidates;

    if (!archivedSelected) {
      candidates = candidates.filter(x => x.IsArchived === false);
    }
    if (favouriteSelected) {
      candidates = candidates.filter(x => x.IsFavourite === true);
    }

    return candidates;
  }

  archiveCandidates(candidates: Candidate[]) {
    this.candidates.forEach(candidate => {
      const getCandidate = candidates.find(x => x.Id === candidate.Id);
      if (getCandidate !== undefined) {
        getCandidate.IsArchived = true;
      }
    });
  }

  restoreCandidates(candidates: Candidate[]) {
    this.candidates.forEach(candidate => {
      const getCandidate = candidates.find(x => x.Id === candidate.Id);
      if (getCandidate !== undefined) {
        getCandidate.IsArchived = false;
      }
    });
  }
}
