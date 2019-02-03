import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../../../models/candidate.model';
import {CandidateService} from '../../../../services/candidate.service';
import {SelectionModel} from '@angular/cdk/collections';
import {InterviewService} from '../../../../services/interview.service';
import {Source} from '../../../../models/source.model';
import {SettingsService} from '../../../../services/settings.service';

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

  sources: Source[] = [];


  constructor(private interviewService: InterviewService,
              private candidateService: CandidateService,
              private settingsService: SettingsService) {}

  ngOnInit() {
    this.candidates = this.candidateService.getAllCandidate();
    this.sources = this.settingsService.getAllSource();
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
    return this.sources.find(x => x.Id === candidate.SourceId).Name;
  }

}
