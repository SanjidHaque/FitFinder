export class CandidateEducation {
  constructor(
    public Id: number,
    public CandidateId: number,
    public Name: string,
    public InstituteName: string,
    public Result: string,
    public StartDate: string,
    public EndDate: string
  ) {}
}
