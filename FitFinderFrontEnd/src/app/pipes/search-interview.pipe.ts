import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchInterview'
})
export class SearchInterviewPipe implements PipeTransform {

  transform(interviews: any, term: any): any {
    if (term === undefined) {
      return interviews;
    }
    return interviews.filter(function (interview) {
      return interview.Name.toLowerCase()
        .includes(term.toLowerCase());
    });
  }

}
