import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {UUID} from 'angular2-uuid';
import {CreateSourceComponent} from '../../../../dialogs/create-source/create-source.component';
import {Source} from '../../../../models/source.model';
import {SettingsService} from '../../../../services/settings.service';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';

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
            iconClass: 'fab fa-wpforms',
            footer: 'Add or update different sources your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const source = new Source(
          UUID.UUID(),
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
