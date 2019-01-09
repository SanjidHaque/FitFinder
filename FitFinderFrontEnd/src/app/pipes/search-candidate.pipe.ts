import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCandidate'
})
export class SearchCandidatePipe implements PipeTransform {

  transform(candidates: any, term: any): any {
    if (term === undefined) {
      return candidates;
    }
    return candidates.filter(function (candidate) {
      return (candidate.FirstName + candidate.LastName).toLowerCase()
        .includes(term.toLowerCase());
    });
  }
}
