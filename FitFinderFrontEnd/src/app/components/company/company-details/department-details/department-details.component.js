"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DepartmentDetailsComponent = /** @class */ (function () {
    function DepartmentDetailsComponent(route, router, dataStorageService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.dataStorageService = dataStorageService;
        this.companies = [];
        this.jobs = [];
        this.departments = [];
        this.route.params
            .subscribe(function (params) {
            _this.departmentId = params['departmentId'];
            _this.companyId = params['companyId'];
        });
    }
    DepartmentDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.
            subscribe(function (data) {
            _this.companies = data['companies'];
        });
        this.company = this.companies.find(function (x) { return x.id === _this.companyId; });
        this.departments = this.company.departments;
        this.department = this.departments.find(function (x) { return x.id === _this.departmentId; });
        this.jobs = this.department.jobs;
    };
    DepartmentDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-jobs',
            templateUrl: './department-details.component.html',
            styleUrls: ['./department-details.component.css']
        })
    ], DepartmentDetailsComponent);
    return DepartmentDetailsComponent;
}());
exports.DepartmentDetailsComponent = DepartmentDetailsComponent;
