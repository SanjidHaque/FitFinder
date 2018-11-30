import {Component, DoCheck, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {Subscription} from 'rxjs/index';
import {CandidateService} from '../../../services/candidate.service';
import {ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-candidate-panel',
  templateUrl: './candidate-panel.component.html',
  styleUrls: ['./candidate-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePanelComponent implements OnInit, OnDestroy {

  selectedValue = '';
  candidates: Candidate[] = [];
  subscription: Subscription;

  displayedColumns: string[] = ['firstName', 'lastName', 'applicationDate'];
  dataSource: MatTableDataSource<Candidate>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private candidateService: CandidateService) {

  }

  ngOnInit() {
    this.selectedValue = 'all';
    this.candidates = this.candidateService.getAllCandidate();
    this.subscription = this.candidateService.candidatesChanged
      .subscribe(
        (candidates: Candidate[]) => {
          this.candidates = candidates;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource = new MatTableDataSource(this.candidates);
        }
      );
  }

   onValueChange(value: string) {
    this.selectedValue = value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
