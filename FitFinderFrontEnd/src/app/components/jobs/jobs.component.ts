import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {JobService} from '../../services/job.service';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private jobService: JobService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobService.jobs = data['jobs'];
        }
      );
  }

}
