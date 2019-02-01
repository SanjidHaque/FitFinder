import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../../../models/candidate.model';
import {CandidateService} from '../../../../services/candidate.service';
import {SelectionModel} from '@angular/cdk/collections';
import {InterviewService} from '../../../../services/interview.service';

@Component({
  selector: 'app-select-candidates-for-interview',
  templateUrl: './select-candidates-for-interview-dialog.component.html',
  styleUrls: ['./select-candidates-for-interview-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCandidatesForInterviewDialogComponent implements OnInit {

  candidates: Candidate[] = [];
  selectedValue = 'all';
  selection = new SelectionModel<Candidate>(true, []);
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';

  sources = [
    {sourceId: 1, sourceName: 'BdJobs.com'},
    {sourceId: 2, sourceName: 'Email'},
    {sourceId: 3, sourceName: 'Facebook'},
    {sourceId: 4, sourceName: 'Internal'},
    {sourceId: 5, sourceName: 'Job is Job'},
    {sourceId: 6, sourceName: 'LinkedIn'},
    {sourceId: 7, sourceName: 'Simply Hired'},
    {sourceId: 8, sourceName: 'Website'}
  ];


  constructor(private interviewService: InterviewService,
              private candidateService: CandidateService) {}

  ngOnInit() {
    this.candidates = this.candidateService.getAllCandidate();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.candidates.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.candidates.forEach(row => this.selection.select(row));
  }

  onValueChange(value: string) {
    this.selectedValue = value;
  }

  getSourceName(candidate: Candidate) {
    return this.sources.find(x => x.sourceId === candidate.SourceId).sourceName;
  }

}
