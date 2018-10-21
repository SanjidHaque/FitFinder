import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../models/company.model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CreateNewCompanyComponent} from './create-new-company/create-new-company.component';
import {NotifierService} from 'angular-notifier';
import {DataShareService} from '../../services/data-share.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  subscription: Subscription;

  displayedColumns: string[] = ['id', 'name', 'address'];
  pageSizeOptions: string[] = ['5', '10', '25', '50'];

  dataSource: MatTableDataSource<Company>;
  companies: Company[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private dataShareService: DataShareService,
              private dialog: MatDialog,
              private notifier: NotifierService) {}

  ngOnInit() {
    this.route.data.subscribe(
      (companies: Company[]) => {
        this.dataShareService.companies = companies['companies'];
      }
    );
    this.companies = this.dataShareService.getCompanies();
    this.subscription = this.dataShareService.companiesChanged
      .subscribe(
        (companies: Company[]) => {
          this.companies = companies;
        }
      );
    this.dataSourceOperations();
  }



  dataSourceOperations() {
    this.dataSource = new MatTableDataSource(this.companies);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  openCreateNewCompanyDialog() {

    const dialogRef = this.dialog.open(CreateNewCompanyComponent, {
      disableClose: false,
      autoFocus: true,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(
      (company: Company) => {
        if  (company !== undefined) {
          this.addNewCompany(company);
        }
      }
    );
   }


   addNewCompany(company: Company) {
     this.dataShareService.saveNewCompany(company);
     this.dataSourceOperations();
     this.notifier.notify( 'default', 'Successfully added company!' );
   }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}





