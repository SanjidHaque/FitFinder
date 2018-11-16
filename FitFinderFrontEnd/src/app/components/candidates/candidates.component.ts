import { Component, OnInit } from '@angular/core';
import {CandidateService} from '../../services/candidate.service';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.candidateService.candidates = data['candidates'];
        }
    );
  }

}
