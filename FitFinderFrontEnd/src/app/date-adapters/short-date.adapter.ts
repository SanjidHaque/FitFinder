import * as moment from 'moment';
import {NativeDateAdapter} from '@angular/material/core';

export class ShortDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    return moment(date).format('Do MMMM, YYYY');
  }
}
