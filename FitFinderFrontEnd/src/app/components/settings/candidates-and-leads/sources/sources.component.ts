import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {UUID} from 'angular2-uuid';
import {CreateSourceComponent} from '../../../../dialogs/create-source/create-source.component';
import {Source} from '../../../../models/source.model';
import {SettingsService} from '../../../../services/settings.service';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';
import {Tag} from '../../../../models/tag.model';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.css']
})
export class SourcesComponent implements OnInit {
  sources: Source[] = [];

  constructor(private sourceDialog: MatDialog,
              private dataStorageService: DataStorageService,
              private settingsService: SettingsService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.sources = this.settingsService.getAllSource();
  }

  editSource(source: Source) {
    const dialogRef = this.sourceDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'Edit Source',
            name: source.Name,
            iconClass: 'fas fa-envelope-open-text',
            footer: 'Add or update different sources your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== source.Name && result !== '') {

        source.Name = result;
        this.notifierService.notify('default', 'Source updated!');

        this.dataStorageService.editSource(source)
          .subscribe(
            (data: any) => {
              source.Name = result;
              this.notifierService.notify('default', 'Source updated!');
            }
          );

      }
    });
  }

  addNewSourceDialog() {
    const dialogRef = this.sourceDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'New Source',
            name: '',
            iconClass: 'fas fa-envelope-open-text',
            footer: 'Add or update different sources your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const source = new Source(
          null,
          result
        );

        this.sources.push(source);
        this.notifierService.notify('default', 'New source added!');

        this.dataStorageService.addNewSource(source)
          .subscribe(
            (data: any) => {
              this.sources.push(source);
              this.notifierService.notify('default', 'New source added!');
            }
          );

      }
    });
  }

}
