import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {Source} from '../../../../models/source.model';
import {SettingsDataStorageService} from '../../../../services/data-storage/settings-data-storage.service';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.css']
})
export class SourcesComponent implements OnInit {
  sources: Source[] = [];

  constructor(private sourceDialog: MatDialog,
              private route: ActivatedRoute,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.sources = data['sources'];
        }
      );
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


        this.settingsDataStorageService.editSource({Id: source.Id, Name: result})
          .subscribe(
            (data: any) => {
              source.Name = result;
              this.notifierService.notify('default', 'Source updated.');
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


        this.settingsDataStorageService.addNewSource(source)
          .subscribe(
            (newSource: Source) => {
              this.sources.push(newSource);
              this.notifierService.notify('default', 'New source added.');
            }
          );

      }
    });
  }

}
