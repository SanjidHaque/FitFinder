import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CandidateDataStorageService} from '../../services/data-storage/candidate-data-storage.service';
import {ActivatedRoute, Data} from '@angular/router';
import {JobDataStorageService} from '../../services/data-storage/job-data-storage.service';
import {SettingsDataStorageService} from '../../services/data-storage/settings-data-storage.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
