import {Candidate} from './candidate.model';
import {Attachment} from '../shared/attachment.model';

export class CandidateAttachment extends Attachment {
  constructor(
    public Candidate: Candidate,
    public CandidateId: number,
    public IsResume: boolean
  ) {}
}
