import {Company} from './company.model';

export class UserAccount {
  Company: Company;

  constructor(
    public Id: string,
    public CompanyId: number,
    public UserName: string,
    public FullName: string,
    public Email: string,
    public Password: string,
    public PhoneNumber: string,
    public JoiningDateTime: string,
    public RoleName: string,
    public IsOwner: boolean,
    company: Company
  ) {
    this.Company = company;
  }
}
