import {Company} from '../settings/company.model';
import {CandidateForInterview} from './candidate-for-interview.model';
import {InterviewerForInterview} from './interviewer-for-interview.model';

export class Interview {
  constructor(
    public Id: number,
    public Name: string,
    public Date: string,
    public Location: string,
    public StartTime: string,
    public EndTime: string,
    public InterviewType: string,
    public CandidatesForInterview: CandidateForInterview[],
    public InterviewersForInterview: InterviewerForInterview[],
    public IsArchived: boolean,
    public HiringManagerName: string,
    public Company: Company,
    public CompanyId: number,
    public ConfirmedCandidate: number,
    public DeclinedCandidate: number
  ) {
  }
}
