import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';

@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrls: ['./job-openings.component.css']
})
export class JobOpeningsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsDataStorageService) { }

  ngOnInit() {

  }

}
