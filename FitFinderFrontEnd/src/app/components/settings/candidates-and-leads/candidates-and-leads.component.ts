import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-candidates-and-leads',
  templateUrl: './candidates-and-leads.component.html',
  styleUrls: ['./candidates-and-leads.component.css']
})
export class CandidatesAndLeadsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsService) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.settingsService.tags = data['tags'];
        this.settingsService.sources = data['sources'];
      }
    );
  }
}
