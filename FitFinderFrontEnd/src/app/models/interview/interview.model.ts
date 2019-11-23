import {CandidatesForInterview} from './candidates-for-interview.model';
import {InterviewersForInterview} from './interviewers-for-interview.model';
import {Company} from '../settings/company.model';


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
    public InterviewersForInterview: InterviewersForInterview[],
    public InterviewStatus: string,
    public IsArchived: boolean,
    public Company: Company,
    public CompanyId: number
  ) {
  }
}
