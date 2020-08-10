import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {noWhitespaceValidator} from '../../custom-form-validators/no-white-space.validator';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update-dialog.component.html',
  styleUrls: ['./add-update-dialog.component.css']
})
export class AddUpdateDialogComponent {

  textFieldForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddUpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.textFieldForm = new FormGroup({
      'inputText': new FormControl(data.name, [Validators.required, noWhitespaceValidator])
    });
  }


  cancelClick() {
    this.data.confirmationStatus = false;
    this.dialogRef.close('');
  }

  confirmClick() {
    this.data.confirmationStatus = true;
    this.dialogRef.close(this.textFieldForm.controls['inputText'].value);
  }


}
