"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CompanyDetailsComponent = /** @class */ (function () {
    function CompanyDetailsComponent(route, router, dataStorageService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.dataStorageService = dataStorageService;
        this.companies = [];
        this.departments = [];
        this.route.params
            .subscribe(function (params) {
            _this.companyId = params['companyId'];
        });
    }
    CompanyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.
            subscribe(function (data) {
            _this.companies = data['companies'];
        });
        this.company = this.companies.find(function (x) { return x.id === _this.companyId; });
        this.departments = this.company.departments;
    };
    CompanyDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-company-details',
            templateUrl: './company-details.component.html',
            styleUrls: ['./company-details.component.css']
        })
    ], CompanyDetailsComponent);
    return CompanyDetailsComponent;
}());
exports.CompanyDetailsComponent = CompanyDetailsComponent;
