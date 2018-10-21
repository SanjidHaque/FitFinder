"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_component_1 = require("./app.component");
var company_component_1 = require("./components/company/company.component");
var app_routing_module_1 = require("./app-routing.module");
var router_1 = require("@angular/router");
var company_resolver_service_1 = require("./route-resolvers/company-resolver.service");
var data_storage_service_1 = require("./services/data-storage.service");
var company_details_component_1 = require("./components/company/company-details/company-details.component");
var department_details_component_1 = require("./components/company/company-details/department-details/department-details.component");
var create_new_company_component_1 = require("./components/company/create-new-company/create-new-company.component");
var animations_1 = require("@angular/platform-browser/animations");
var applicants_component_1 = require("./components/applicants/applicants.component");
var users_component_1 = require("./components/users/users.component");
var app_material_module_1 = require("./modules/app-material.module");
var forms_1 = require("@angular/forms");
var angular_notifier_1 = require("angular-notifier");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                company_component_1.CompanyComponent,
                company_details_component_1.CompanyDetailsComponent,
                department_details_component_1.DepartmentDetailsComponent,
                create_new_company_component_1.CreateNewCompanyComponent,
                applicants_component_1.ApplicantsComponent,
                users_component_1.UsersComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                router_1.RouterModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                app_material_module_1.AppMaterialModule,
                forms_1.FormsModule,
                angular_notifier_1.NotifierModule.withConfig({
                    position: {
                        horizontal: {
                            position: 'right',
                            distance: 12
                        },
                        vertical: {
                            position: 'bottom',
                            distance: 12,
                            gap: 10
                        }
                    },
                    behaviour: {
                        autoHide: 10000,
                        onClick: false,
                        onMouseover: 'pauseAutoHide',
                        showDismissButton: true,
                        stacking: 4
                    }
                }),
                UuidModule
            ],
            providers: [
                data_storage_service_1.DataStorageService,
                company_resolver_service_1.CompanyResolverService
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
