import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {Tag} from '../../../../models/tag.model';
import {SettingsService} from '../../../../services/settings.service';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Tag[] = [];

  constructor(private tagDialog: MatDialog,
              private settingsService: SettingsService,
              private dataStorageService: DataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.tags = this.settingsService.getAllTag();
  }

  editTag(tag: Tag) {
    const dialogRef = this.tagDialog.open(AddUpdateComponent,
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


        this.dataStorageService.editTag(tag)
          .subscribe(
            (data: any) => {
              tag.Name = result;
              this.notifierService.notify('default', 'Tag updated!');
            }
          );

      }
    });
  }

  addNewTagDialog() {
    const dialogRef = this.tagDialog.open(AddUpdateComponent,
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



        this.dataStorageService.addNewTag(tag)
          .subscribe(
            (data: any) => {
              this.tags.push(tag);
              this.notifierService.notify('default', 'New tag added!');
            }
          );

      }
    });
  }

}
