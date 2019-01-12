import {JobAttachment} from './job-attachment.model';

export class Job {
  Id: string;
  JobTitle: string;
  JobCode: string;
  JobDescription: string;
  JobImmediate: string;
  JobIntermediate: string;
  JobGoodToHave: string;
  JobLocation: string;
  DepartmentId: string;
  JobFunctionalityId: string;
  EmploymentTypeId: string;
  JobPositions: string;
  JobClosingDate: string;
  JobExperienceStarts: string;
  JobExperienceEnds: string;
  JobSalaryStarts: string;
  JobSalaryEnds: string;
  JobAttachment: JobAttachment[];
  IsArchived: boolean;

  constructor(
     id: string,
     jobTitle: string,
     jobCode: string,
     jobDescription: string,
     jobImmediate: string,
     jobIntermediate: string,
     jobGoodToHave: string,
     jobLocation: string,
     departmentId: string,
     jobFunctionalityId: string,
     employmentTypeId: string,
     jobPositions: string,
     jobClosingDate: string,
     jobExperienceStarts: string,
     jobExperienceEnds: string,
     jobSalaryStarts: string,
     jobSalaryEnds: string,
     jobAttachment: JobAttachment[] = [],
     isArchived: boolean
  ) {

    this.Id = id;
    this.JobTitle = jobTitle;
    this.JobCode = jobCode;
    this.JobDescription = jobDescription;
    this.JobImmediate = jobImmediate;
    this.JobIntermediate = jobIntermediate;
    this.JobGoodToHave = jobGoodToHave;
    this.JobLocation = jobLocation;
    this.DepartmentId = departmentId;
    this.JobFunctionalityId = jobFunctionalityId;
    this.EmploymentTypeId = employmentTypeId ;
    this.JobPositions = jobPositions;
    this.JobClosingDate = jobClosingDate;
    this.JobExperienceStarts = jobExperienceStarts;
    this.JobExperienceEnds = jobExperienceEnds;
    this.JobSalaryStarts = jobSalaryStarts;
    this.JobSalaryEnds = jobSalaryEnds;
    this.JobAttachment = jobAttachment;
    this.IsArchived = isArchived;
  }
}
