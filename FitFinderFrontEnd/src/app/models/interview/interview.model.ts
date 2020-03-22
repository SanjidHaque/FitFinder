import {Company} from '../settings/company.model';
import {CandidatesForInterview} from './candidates-for-interview.model';
import {InterviewerForInterview} from './interviewers-for-interview.model';

export class Interview {
  constructor(
    public Id: number,
    public Name: string,
    public Date: string,
    public Location: string,
    public StartTime: string,
    public EndTime: string,
    public InterviewType: string,
    public CandidatesForInterview: CandidatesForInterview[],
    public InterviewersForInterview: InterviewerForInterview[],
    public InterviewStatus: string,
    public IsArchived: boolean,
    public HiringManagerName: string,
    public Company: Company,
    public CompanyId: number
  ) {
  }
}
