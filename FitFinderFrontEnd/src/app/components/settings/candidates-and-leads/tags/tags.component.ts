import { Component, OnInit } from '@angular/core';
import {CreateSourceComponent} from '../../../../dialogs/create-source/create-source.component';
import {Source} from '../../../../models/source.model';
import {UUID} from 'angular2-uuid';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {Tag} from '../../../../models/tag.model';
import {CreateTagComponent} from '../../../../dialogs/create-tag/create-tag.component';
import {SettingsService} from '../../../../services/settings.service';

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

  addNewTagDialog() {
    const dialogRef = this.tagDialog.open(CreateTagComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: { name: ''}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const tag = new Tag(
          UUID.UUID(),
          result
        );
        this.tags.push(tag);

      }
    });
  }

}
