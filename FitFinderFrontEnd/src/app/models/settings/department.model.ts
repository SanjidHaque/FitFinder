import {Company} from './company.model';

export class Department {
  constructor(
    public Id: number,
    public Name: string,
    public Company: Company,
    public CompanyId: number
  ) {}
}
