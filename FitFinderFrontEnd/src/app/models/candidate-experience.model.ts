export class CandidateExperience {
  constructor(
    public Id: string,
    public CandidateId: string,
    public EmployerName: string,
    public Designation: string,
    public Role: string,
    public StartDate: string,
    public EndDate: string,
    public IsCurrent: boolean
  ) {}
}
