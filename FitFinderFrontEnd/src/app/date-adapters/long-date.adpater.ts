import * as moment from 'moment';
import {NativeDateAdapter} from '@angular/material/core';

export class LongDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    return moment(date).format('ddd, Do MMM, YYYY');
  }
}
