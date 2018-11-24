import {NativeDateAdapter} from '@angular/material';
import * as moment from 'moment';

export class LongDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    return moment(date).format('ddd, Do MMMM, YYYY');
  }
}
