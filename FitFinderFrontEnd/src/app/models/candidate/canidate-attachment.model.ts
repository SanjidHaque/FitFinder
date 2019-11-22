import {Candidate} from './candidate.model';

export class CandidateAttachment {
  constructor(
    public Id: number,
    public FileName: string,
    public ModifiedFileName: string,
    public IsResume: boolean,
    public Candidate: Candidate,
    public CandidateId: number
  ) {}
}
