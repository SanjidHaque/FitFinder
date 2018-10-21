"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Job = /** @class */ (function () {
    function Job(id, companyId, departmentId, name, stages, applicants) {
        this.id = id;
        this.companyId = companyId;
        this.departmentId = departmentId;
        this.name = name;
        this.stages = stages;
        this.applicants = applicants;
    }
    return Job;
}());
exports.Job = Job;
