"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var create_new_company_component_1 = require("./create-new-company/create-new-company.component");
var CompanyComponent = /** @class */ (function () {
    function CompanyComponent(route, snackBar, dialog, notifier) {
        this.route = route;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.notifier = notifier;
        this.displayedColumns = ['id', 'name', 'address'];
        this.pageSizeOptions = ['5', '10', '25', '50'];
        this.companies = [];
    }
    CompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.companies = data['companies'];
        });
        this.dataSource = new material_1.MatTableDataSource(this.companies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    CompanyComponent.prototype.openCreateNewCompanyDialog = function () {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '600px';
        var dialogRef = this.dialog.open(create_new_company_component_1.CreateNewCompanyComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (company) {
            if (company !== undefined) {
                _this.saveNewCompany(company);
            }
        });
    };
    CompanyComponent.prototype.saveNewCompany = function (company) {
        this.notifier.notify('default', 'Successfully added company!');
    };
    CompanyComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator)
    ], CompanyComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort)
    ], CompanyComponent.prototype, "sort", void 0);
    CompanyComponent = __decorate([
        core_1.Component({
            selector: 'app-company',
            templateUrl: './company.component.html',
            styleUrls: ['./company.component.css']
        })
    ], CompanyComponent);
    return CompanyComponent;
}());
exports.CompanyComponent = CompanyComponent;
