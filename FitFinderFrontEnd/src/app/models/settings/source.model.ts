import {Company} from './company.model';

export class Source {
  constructor(
    public Id: number,
    public Name: string,
    public TotalCandidates: number,
    public ActiveCandidates: number,
    public HiredCandidates: number,
    public Company: Company,
    public CompanyId: number
  ) {}
}
