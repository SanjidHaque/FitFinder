import { Injectable } from '@angular/core';
import {Candidate} from '../../models/candidate/candidate.model';
import {Job} from '../../models/job/job.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  candidate: Candidate;
  candidates: Candidate[] = [];

  getAllCandidate() {
    return this.candidates.slice();
  }

  filterByArchived(archivedSelected: boolean, favouriteSelected: boolean) {
    const candidates = this.candidates;

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
