export class JobAttachment {
  constructor(
    public Id: string,
    public JobId: string,
    public FileName: string,
    public ModifiedFileName: string
  ) {}
}
