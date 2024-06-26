"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var company_component_1 = require("../components/company/company.component");
var company_resolver_service_1 = require("./route-resolvers/candidate-resolver.service");
var company_details_component_1 = require("../components/company/company-details/company-details.component");
var department_details_component_1 = require("../components/company/company-details/department-details/department-details.component");
var applicants_component_1 = require("../components/applicants/applicants.component");
var users_component_1 = require("../components/users/users.component");
var appRoutes = [
    {
        path: 'company',
        component: company_component_1.CompanyComponent,
        resolve: { companies: company_resolver_service_1.CompanyResolverService }
    },
    {
        path: 'company/:companyId/department',
        component: company_details_component_1.CompanyDetailsComponent,
        resolve: { companies: company_resolver_service_1.CompanyResolverService }
    },
    {
        path: 'company/:companyId/department/:departmentId/job',
        component: department_details_component_1.DepartmentDetailsComponent,
        resolve: { companies: company_resolver_service_1.CompanyResolverService }
    },
    {
        path: 'applicants',
        component: applicants_component_1.ApplicantsComponent
    },
    {
        path: 'users',
        component: users_component_1.UsersComponent
    },
    { path: '', redirectTo: '/company', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(appRoutes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
