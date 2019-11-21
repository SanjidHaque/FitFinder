import {Company} from '../settings/company.model';

export class Resource {
  constructor(
    public Id: number,
    public Name: string,
    public Company: Company,
    public CompanyId: number
  ) {}
}
