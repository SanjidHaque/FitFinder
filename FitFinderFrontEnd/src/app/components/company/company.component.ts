import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../../models/company.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'address'];
  pageSizeOptions: string[] = ['5', '10', '25', '50'];

  dataSource: MatTableDataSource<Company>;
  companies: Company[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: Company[]) => {
        this.companies = data['companies'];
      }
    );
    this.dataSource = new MatTableDataSource(this.companies);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createNewCompany() {
    this.router.navigate(['/company/create-new-company']);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



