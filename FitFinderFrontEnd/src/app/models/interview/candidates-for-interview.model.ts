import {Candidate} from '../candidate/candidate.model';
import {Interview} from './interview.model';

export class CandidatesForInterview {
  constructor(
    public Id: number,
    public Interview: Interview,
    public InterviewId: number,
    public Candidate: Candidate,
    public CandidateId: number
  ) {}
}
