import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CandidateService} from '../../services/candidate.service';
import {ActivatedRoute, Data} from '@angular/router';
import {JobService} from '../../services/job.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  constructor(private candidateService: CandidateService,
              private jobService: JobService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.candidateService.candidates = data['candidates'];
          this.jobService.jobs = data['jobs'];
        }
    );
  }

}
