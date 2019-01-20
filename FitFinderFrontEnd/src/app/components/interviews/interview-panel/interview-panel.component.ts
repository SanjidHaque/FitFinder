import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Interview} from '../../../models/interview.model';
import {InterviewService} from '../../../services/interview.service';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';



@Component({
  selector: 'app-interview-panel',
  templateUrl: './interview-panel.component.html',
  styleUrls: ['./interview-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterviewPanelComponent implements OnInit {

  selectedValue = 'all';
  interviews: Interview[] = [];
  all = 'All';
  selectedDateFormatted = '';
  selection = new SelectionModel<Interview>(true, []);
  interviewTypes = [
    {id: '1', type: 'Face to Face'},
    {id: '2', type: 'Telephonic'},
    {id: '3', type: 'Video Conference'},
    {id: '4', type: 'Group'},
    {id: '5', type: 'Panel'}
  ];


  constructor(private interviewService: InterviewService) {}

  ngOnInit() {
    this.interviews = this.interviewService.getAllInterview();
  }

  getDate(selectedDate: string) {
    const formattedDate = moment(new Date(selectedDate)).format('ddd, Do MMMM, YYYY');
    this.selectedDateFormatted = formattedDate;
  }

  onValueChange(value: string) {
    this.selectedValue = value;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.interviews.length;
    return numSelected === numRows;
  }

  selectValueChanged(value: any) {
    console.log(value);
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.interviews.forEach(row => this.selection.select(row));
  }

  getInterviewTypeName(interview: Interview) {
    return this.interviewTypes.find(x => x.id === interview.InterviewTypeId).type;
  }

  getInterviewDay(interview: Interview) {
    return moment(new Date(interview.InterviewDate)).format('Do');
  }

  getInterviewMonth(interview: Interview) {
    return moment(new Date(interview.InterviewDate)).format('MMMM');
  }

  getInterviewYear(interview: Interview) {
    return moment(new Date(interview.InterviewDate)).format('YYYY');
  }


}
