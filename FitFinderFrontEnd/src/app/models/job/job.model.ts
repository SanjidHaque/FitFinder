import {JobAttachment} from './job-attachment.model';
import {Workflow} from '../settings/workflow.model';
import {Department} from '../settings/department.model';
import {JobFunction} from '../settings/job-function.model';
import {JobType} from '../settings/job-type.model';
import {Company} from '../settings/company.model';

export class Job {
  constructor(
     public Id: number,
     public Title: string,
     public Code: string,
     public Description: string,
     public ImmediateSkills: string,
     public IntermediateSkills: string,
     public GoodToHaveSkills: string,
     public Location: string,
     public Department: Department,
     public DepartmentId: number,
     public JobFunction: JobFunction,
     public JobFunctionId: number,
     public JobType: JobType,
     public JobTypeId: number,
     public Positions: number,
     public ClosingDate: string,
     public ExperienceStarts: number,
     public ExperienceEnds: number,
     public SalaryStarts: number,
     public SalaryEnds: number,
     public JobAttachments: JobAttachment[],
     public IsArchived: boolean,
     public IsPublished: boolean,
     public PostingDate: string,
     public IsFavourite: boolean,
     public Company: Company,
     public CompanyId: number,
     public Workflow: Workflow,
     public WorkflowId: number
  ) {}
}
