import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter} from '@angular/material';
import {LongDateAdapter} from '../../../date-adapters/long-date.adpater';

@Component({
  selector: 'app-add-new-interview',
  templateUrl: './add-new-interview.component.html',
  styleUrls: ['./add-new-interview.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: DateAdapter, useClass: LongDateAdapter}]
})

export class AddNewInterviewComponent implements OnInit {

  addNewInterviewForm: FormGroup;


  users = [
    {id: '1', userName: 'Yaha Juan', role: 'Team member'},
    {id: '2', userName: 'Cholo Han', role: 'Team member'},
    {id: '3', userName: 'Kaytui Hyan', role: 'Team member'},
    {id: '4', userName: 'Kunisu Honda', role: 'Team member'},
    {id: '5', userName: 'Yahan Kawai', role: 'Team member'},
    {id: '6', userName: 'Tatua Nokia', role: 'Team member'},
    {id: '7', userName: 'Vusimuji Momak', role: 'Team member'},
    {id: '8', userName: 'Wyengyu Duija', role: 'Team member'}
  ];

  interviewTypes = [
    { id: '1', type: 'Face to Face' },
    { id: '2', type: 'Telephonic' },
    { id: '3', type: 'Video Conference' },
    { id: '4', type: 'Group' },
    { id: '5', type: 'Panel' }
    ];

  constructor() {}

  ngOnInit() {
    this.addNewInterviewForm = new FormGroup({
      'interviewDate': new FormControl('', Validators.required),
      'interviewName': new FormControl(''),
      'interviewers': new FormControl(''),
      'interviewLocation': new FormControl(''),
      'interviewStartTime': new FormControl('10:00', Validators.required),
      'interviewEndTime': new FormControl('11:30', Validators.required),
      'interviewTypeId': new FormControl('', Validators.required)
    });
  }

  getTimeWithAmOrPm(time: string) {
    const minutes = time.slice(3, 5);
    if ( Number.parseInt(time.slice(0, 2)) > 12 ) {
      const hours =  Number.parseInt(time.slice(0, 2)) - 12;
      const newTime = hours.toString() + ':' + minutes + ' PM';
    } else if ( Number.parseInt(time.slice(0, 2)) === 0 ) {
      const newTime = '12' + ':' + minutes + ' AM';
    } else if ( Number.parseInt(time.slice(0, 2)) === 12 ) {
      const newTime = '12' + ':' + minutes + ' PM';
    } else {
      const newTime = time + ' AM';
    }
  }


  onSubmitNewInterview() {
    const time = this.addNewInterviewForm.value.interviewStartTime;
    this.getTimeWithAmOrPm(time);
  }
}
