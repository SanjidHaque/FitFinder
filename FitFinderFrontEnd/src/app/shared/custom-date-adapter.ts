import {NativeDateAdapter} from '@angular/material';
import * as moment from 'moment';

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    return moment(date).format('Do MMMM, YYYY');
  }
}
