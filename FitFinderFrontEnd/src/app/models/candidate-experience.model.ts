export class CandidateExperience {
  constructor(
    public id: string,
    public employerName: string,
    public designation: string,
    public role: string,
    public startDate: string,
    public endDate: string,
    public isCurrent: boolean
  ) {}
}
