import {JobAttachment} from './job-attachment.model';

export class Job {
  Id: number;
  JobTitle: string;
  JobCode: string;
  JobDescription: string;
  JobImmediate: string;
  JobIntermediate: string;
  JobGoodToHave: string;
  JobLocation: string;
  DepartmentId: number;
  JobFunctionalityId: number;
  EmploymentTypeId: number;
  JobPositions: number;
  JobClosingDate: string;
  JobExperienceStarts: number;
  JobExperienceEnds: number;
  JobSalaryStarts: number;
  JobSalaryEnds: number;
  JobAttachment: JobAttachment[];
  IsArchived: boolean;
  IsPublished: boolean;
  JobCreatedDate: string;
  IsFavourite: boolean;
  WorkflowId: number;

  constructor(
     id: number,
     jobTitle: string,
     jobCode: string,
     jobDescription: string,
     jobImmediate: string,
     jobIntermediate: string,
     jobGoodToHave: string,
     jobLocation: string,
     departmentId: number,
     jobFunctionalityId: number,
     employmentTypeId: number,
     jobPositions: number,
     jobClosingDate: string,
     jobExperienceStarts: number,
     jobExperienceEnds: number,
     jobSalaryStarts: number,
     jobSalaryEnds: number,
     jobAttachment: JobAttachment[] = [],
     isArchived: boolean,
     isPublished: boolean,
     jobCreatedDate: string,
     isFavourite: boolean,
     workflowId: number
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
    this.IsPublished = isPublished;
    this.JobCreatedDate = jobCreatedDate;
    this.IsFavourite = isFavourite;
    this.WorkflowId = workflowId;
  }
}
