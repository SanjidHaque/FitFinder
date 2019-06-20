export class Company {
  constructor (
    public Id: number,
    public CompanyName: string,
    public CompanyAddress: string,
    public CompanyEmail: string,
    public CompanyPhoneNumber: string,
    public AdminUserName: string,
    public AdminFullName: string,
    public AdminEmail: string,
    public AdminPhoneNumber: string,
    public JoiningDateTime: string
  ) {}
}
