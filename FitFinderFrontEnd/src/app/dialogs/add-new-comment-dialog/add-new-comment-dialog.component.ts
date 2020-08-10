import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {noWhitespaceValidator} from '../../custom-form-validators/no-white-space.validator';

@Component({
  selector: 'app-add-new-comment-dialog',
  templateUrl: './add-new-comment-dialog.component.html',
  styleUrls: ['./add-new-comment-dialog.component.css']
})
export class AddNewCommentDialogComponent {

  commentForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddNewCommentDialogComponent>) {
    this.commentForm = new FormGroup({
      'comment': new FormControl('', [Validators.required, noWhitespaceValidator])
    });
  }

  cancelClick() {
    this.dialogRef.close('');
  }

  confirmClick() {
    this.dialogRef.close(this.commentForm.controls['comment'].value);
  }

}
