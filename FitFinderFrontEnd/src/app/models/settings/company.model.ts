import {Candidate} from '../candidate/candidate.model';
import {Interview} from '../interview/interview.model';
import {Job} from '../job/job.model';
import {UserAccount} from './user-account.model';
import {WithdrawnReason} from './withdrawn-reason.model';
import {RejectedReason} from './rejected-reason.model';
import {JobType} from './job-type.model';
import {JobFunction} from './job-function.model';
import {Department} from './department.model';
import {Source} from './source.model';
import {Tag} from './tag.model';
import {Workflow} from './workflow.model';

export class Company {
  constructor (
    public Id: number,
    public CompanyName: string,
    public CompanyAddress: string,
    public CompanyEmail: string,
    public CompanyPhoneNumber: string,
    public AdminUserName: string,
    public AdminFullName: string,
    public AdminEmail: string,
    public AdminPhoneNumber: string,
    public JoiningDateTime: string,
    public Candidates: Candidate[],
    public Interviews: Interview[],
    public Jobs: Job[],
    public Workflows: Workflow[],
    public Tags: Tag[],
    public Sources: Source[],
    public Departments: Department[],
    public JobFunctions: JobFunction[],
    public JobTypes: JobType[],
    public RejectedReasons: RejectedReason[],
    public WithdrawnReasons: WithdrawnReason[],
    public UserAccounts: UserAccount[]
  ) {}
}
