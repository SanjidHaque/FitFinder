import { Injectable } from '@angular/core';
import {Candidate} from '../../models/candidate/candidate.model';

import {UserAccountDataStorageService} from '../data-storage-services/user-account-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  candidate: Candidate;
  candidates: Candidate[] = [];
  candidateDefaultImage = 'assets/images/defaultImage.png';
  imageFolderPath = '';

  constructor(private userAccountDataStorageService: UserAccountDataStorageService) {
    this.imageFolderPath = this.userAccountDataStorageService.imageFolderPath;
  }

  getAllCandidate() {
    return this.candidates.slice();
  }

  setCandidateProfilePicture() {
    this.candidates.forEach(candidate => {
      if (candidate.CandidateImagePath !== null) {
        candidate.CandidateImagePath = this.imageFolderPath + candidate.CandidateImagePath;
      } else {
        candidate.CandidateImagePath = this.candidateDefaultImage;
      }
    });
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
