import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../models/company.model';
import {MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CreateNewCompanyComponent} from './create-new-company/create-new-company.component';
import {NotifierService} from 'angular-notifier';

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
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              private notifier: NotifierService) {}

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

  openCreateNewCompanyDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';


    const dialogRef = this.dialog.open(CreateNewCompanyComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      (company: Company) => {
        console.log(company);
        this.saveNewCompany(company);
      }
    );
   }


   saveNewCompany(company: Company) {
     this.notifier.notify( 'default', 'Successfully added company!' );

   }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}





