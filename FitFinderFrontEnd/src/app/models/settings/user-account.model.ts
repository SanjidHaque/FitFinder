import {Company} from './company.model';
import {Department} from './department.model';

export class UserAccount {
  constructor(
    public Id: string,
    public Company: Company,
    public CompanyId: number,
    public UserName: string,
    public FullName: string,
    public Email: string,
    public Password: string,
    public PhoneNumber: string,
    public JoiningDateTime: string,
    public RoleName: string,
    public Department: Department,
    public DepartmentId: number,
    public IsOwner: boolean
  ) {}
}
