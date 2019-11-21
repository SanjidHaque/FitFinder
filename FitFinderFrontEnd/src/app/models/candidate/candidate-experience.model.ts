import {Candidate} from './candidate.model';

export class CandidateExperience {
  constructor(
    public Id: number,
    public Candidate: Candidate,
    public CandidateId: number,
    public EmployerName: string,
    public Designation: string,
    public Role: string,
    public StartDate: string,
    public EndDate: string,
    public IsCurrent: boolean
  ) {}
}
