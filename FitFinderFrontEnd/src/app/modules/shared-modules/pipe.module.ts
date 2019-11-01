import {NgModule} from '@angular/core';
import {SearchCandidatePipe} from '../../pipes/search-candidate.pipe';
import {SearchJobPipe} from '../../pipes/search-job.pipe';
import {StarRatingModule} from 'angular-star-rating';

@NgModule({
  declarations: [
    SearchCandidatePipe,
    SearchJobPipe
  ],
  exports: [
    SearchCandidatePipe,
    SearchJobPipe
  ]
})
export class PipeModule {}
