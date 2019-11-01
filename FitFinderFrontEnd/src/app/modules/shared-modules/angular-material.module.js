"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var create_new_company_component_1 = require("../components/company/create-new-company/create-new-company.component");
var material_1 = require("@angular/material");
var table_1 = require("@angular/material/table");
var sort_1 = require("@angular/material/sort");
var paginator_1 = require("@angular/material/paginator");
var button_1 = require("@angular/material/button");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var tooltip_1 = require("@angular/material/tooltip");
var dialog_1 = require("@angular/material/dialog");
var snack_bar_1 = require("@angular/material/snack-bar");
var AngularMaterialModule = /** @class */ (function () {
    function AppMaterialModule() {
    }
    AppMaterialModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                sort_1.MatSortModule,
                tooltip_1.MatTooltipModule,
                snack_bar_1.MatSnackBarModule
            ],
            exports: [
                button_1.MatButtonModule,
                dialog_1.MatDialogModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                sort_1.MatSortModule,
                tooltip_1.MatTooltipModule,
                snack_bar_1.MatSnackBarModule,
            ],
            entryComponents: [
                create_new_company_component_1.CreateNewCompanyComponent
            ],
            providers: [
                { provide: material_1.MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
            ],
            declarations: []
        })
    ], AppMaterialModule);
    return AppMaterialModule;
}());
exports.AppMaterialModule = AngularMaterialModule;
