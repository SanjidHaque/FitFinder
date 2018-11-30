export class CandidateAttachment {
  constructor(
    public id: string,
    public candidateId: string,
    public fileName: string,
    public modifiedFileName: string,
    public isResume: boolean
  ) {}
}
