import {CandidatesForInterview} from './candidates-for-interview.model';
import {InterviewersForInterview} from './interviewers-for-interview.model';
import {Resource} from '../shared/resource.model';

export class Interview extends Resource {
  constructor (
     public Date: string,
     public Location: string,
     public StartTime: string,
     public EndTime: string,
     public Type: string,
     public CandidatesForInterview: CandidatesForInterview[],
     public InterviewersForInterview: InterviewersForInterview[],
     public Status: string,
     public IsArchived: boolean
  ) {}
}
