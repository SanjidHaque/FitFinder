export class ChangePassword {
  constructor(
    public UserId: string,
    public Code: string,
    public Email: string,
    public OldPassword: string,
    public NewPassword: string
  ) {}
}
