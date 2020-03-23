import {NgModule} from '@angular/core';
import {SearchCandidatePipe} from '../../pipes/search-candidate.pipe';
import {SearchJobPipe} from '../../pipes/search-job.pipe';
import {SearchInterviewPipe} from '../../pipes/search-interview.pipe';

@NgModule({
  declarations: [
    SearchCandidatePipe,
    SearchJobPipe,
    SearchInterviewPipe
  ],
  exports: [
    SearchCandidatePipe,
    SearchJobPipe,
    SearchInterviewPipe
  ]
})
export class PipeModule {}
