import {Company} from './company.model';

export class JobType extends Resource  {
  constructor(
    public Id: number,
    public Name: string,
    public Company: Company,
    public CompanyId: number
  ) {}
}
