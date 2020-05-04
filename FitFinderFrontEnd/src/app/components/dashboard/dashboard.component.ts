import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Job} from '../../models/job/job.model';
import {Interview} from '../../models/interview/interview.model';
import {Source} from '../../models/settings/source.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  interviews: Interview[] = [];
  jobs: Job[] = [];
  sources: Source[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.jobs = data['jobs'].jobs;
      this.interviews = data['interviews'].interviews;
      this.sources = data['sources'].sources;

      this.jobs = this.jobs.filter(x => x.IsArchived === false);
    });
  }

}
