"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var company_model_1 = require("../../../models/company.model");
var CreateNewCompanyComponent = /** @class */ (function () {
    function CreateNewCompanyComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    CreateNewCompanyComponent.prototype.ngOnInit = function () {
    };
    CreateNewCompanyComponent.prototype.getNewCompanyData = function () {
        var company = new company_model_1.Company('12', 'Test', '89/A', []);
        return company;
    };
    CreateNewCompanyComponent.prototype.closeCreateNewCompanyDialog = function () {
        this.dialogRef.close();
    };
    CreateNewCompanyComponent = __decorate([
        core_1.Component({
            selector: 'app-create-new-company',
            templateUrl: './create-new-company.component.html',
            styleUrls: ['./create-new-company.component.css']
        })
    ], CreateNewCompanyComponent);
    return CreateNewCompanyComponent;
}());
exports.CreateNewCompanyComponent = CreateNewCompanyComponent;
