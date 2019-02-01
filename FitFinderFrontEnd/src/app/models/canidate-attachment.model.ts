export class CandidateAttachment {
  constructor(
    public Id: number,
    public CandidateId: number,
    public FileName: string,
    public ModifiedFileName: string,
    public IsResume: boolean
  ) {}
}
