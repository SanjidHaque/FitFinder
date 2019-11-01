import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {InterviewDataStorageService} from '../../services/data-storage-services/interview-data-storage.service';
import {ActivatedRoute, Data} from '@angular/router';
import {JobDataStorageService} from '../../services/data-storage-services/job-data-storage.service';
import {CandidateDataStorageService} from '../../services/data-storage-services/candidate-data-storage.service';
import {SettingsDataStorageService} from '../../services/data-storage-services/settings-data-storage.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css'],
})
export class InterviewsComponent {

}
