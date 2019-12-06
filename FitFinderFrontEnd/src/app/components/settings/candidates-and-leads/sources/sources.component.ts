import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {Source} from '../../../../models/settings/source.model';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {ActivatedRoute, Data} from '@angular/router';
import {SettingsService} from '../../../../services/shared-services/settings.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.css']
})
export class SourcesComponent implements OnInit {
  isDisabled = false;
  sources: Source[] = [];

  constructor(private sourceDialog: MatDialog,
              private route: ActivatedRoute,
              private settingsService: SettingsService,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.sources = data['sources'].sources;
        });
  }


  addNewSource() {
    this.settingsService.addNewSource().then(result => {
      if (result !== '') {

        const source = new Source(
          null,
          result,
          null,
          null
        );

        this.settingsDataStorageService.addNewSource(source)
          .subscribe(
            (data: any) => {
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.sources.push(data.source);
                this.notifierService.notify('default', 'New source added.');
              }
            });
      }
    });
  }

  editSource(source: Source) {
    this.settingsService.editSource(source.Name).then(result => {
      if (result !== '') {
        const editedSource = new Source(
          source.Id,
          result,
          null,
          null
        );

        this.isDisabled = true;
        this.settingsDataStorageService.editSource(editedSource)
          .subscribe(
            (data: any) => {
              this.isDisabled = false;
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                source.Name = result;
                this.notifierService.notify('default',
                  'Source updated successfully.');
              }
            });
      }
    });
  }

  deleteSource(sourceId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deleteSource().then(result => {

      if (result.confirmationStatus) {

        this.settingsDataStorageService.deleteSource(sourceId)
          .subscribe((response: any) => {
            this.isDisabled = false;

            if (response.statusText !== 'Success') {

              this.notifierService.notify('default', response.statusText);

            } else {

              this.sources.splice(index, 1);
              this.notifierService.notify('default',
                'Source deleted successfully.');
            }

          });
      }

      this.isDisabled = false;

    })
      .catch();
  }


}
