export class CandidateAttachment {
  constructor(
    public Id: string,
    public CandidateId: string,
    public FileName: string,
    public ModifiedFileName: string,
    public IsResume: boolean
  ) {}
}
