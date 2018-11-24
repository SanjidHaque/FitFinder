export class CandidateAttachment {
  constructor(
    public id: string,
    public candidateId: string,
    public fileName: string,
    public filePath: string,
    public isResume: boolean
  ) {}
}
