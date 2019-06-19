import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {Tag} from '../../../../models/tag.model';
import {SettingsDataStorageService} from '../../../../services/data-storage/settings-data-storage.service';
import {AddUpdateDialogComponent} from '../../../../dialogs/add-update-dialog/add-update-dialog.component';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Tag[] = [];

  constructor(private tagDialog: MatDialog,
              private route: ActivatedRoute,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.tags = data['tags'];
        }
      );
  }

  editTag(tag: Tag) {
    const dialogRef = this.tagDialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'Edit Tag',
            name: tag.Name,
            iconClass: 'fas fa-tags',
            footer: 'Add or update different tags your candidates need.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== tag.Name && result !== '') {


        this.settingsDataStorageService.editTag(tag)
          .subscribe(
            (data: any) => {
              tag.Name = result;
              this.notifierService.notify('default', 'Tag updated.');
            }
          );

      }
    });
  }

  addNewTagDialog() {
    const dialogRef = this.tagDialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'New Tag',
            name: '',
            iconClass: 'fas fa-tags',
            footer: 'Add or update different tags your candidates need.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const tag = new Tag(
          null,
          result
        );



        this.settingsDataStorageService.addNewTag(tag)
          .subscribe(
            (data: any) => {
              this.tags.push(tag);
              this.notifierService.notify('default', 'New tag added.');
            }
          );

      }
    });
  }

}
