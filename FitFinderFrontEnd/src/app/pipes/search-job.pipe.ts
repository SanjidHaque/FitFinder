import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchJob'
})
export class SearchJobPipe implements PipeTransform {

  transform(jobs: any, term: any): any {
    if (term === undefined) {
      return jobs;
    }
    return jobs.filter(function (job) {
      return job.JobTitle.toLowerCase()
        .includes(term.toLowerCase());
    });
  }

}
