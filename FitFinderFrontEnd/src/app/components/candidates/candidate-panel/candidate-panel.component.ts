import {Component, AfterViewInit, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Candidate} from '../../../models/candidate.model';
import {Subscription} from 'rxjs/index';
import {CandidateService} from '../../../services/candidate.service';
import {ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-candidate-panel',
  templateUrl: './candidate-panel.component.html',
  styleUrls: ['./candidate-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePanelComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Select', 'FirstName', 'ApplicationDate', 'Source'];
  pageSizeOptions: string[] = ['5', '10', '20'];
  dataSource: MatTableDataSource<Candidate>;
  selection = new SelectionModel<Candidate>(true, []);

  selectedValue = '';
  candidates: Candidate[] = [];
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sources = [
    {sourceId: '1', sourceName: 'BdJobs.com'},
    {sourceId: '2', sourceName: 'Email'},
    {sourceId: '3', sourceName: 'Facebook'},
    {sourceId: '4', sourceName: 'Internal'},
    {sourceId: '5', sourceName: 'Job is Job'},
    {sourceId: '6', sourceName: 'LinkedIn'},
    {sourceId: '7', sourceName: 'Simply Hired'},
    {sourceId: '8', sourceName: 'Website'}
  ];

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.selectedValue = 'all';
    this.candidates = this.candidateService.getAllCandidate();
    this.dataSource = new MatTableDataSource(this.candidates);
 }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onValueChange(value: string) {
    this.selectedValue = value;
  }

  getSourceName(candidateSourceId: string) {
    return this.sources.find(x => x.sourceId === candidateSourceId).sourceName;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
