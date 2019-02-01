export class JobAttachment {
  constructor(
    public Id: number,
    public JobId: number,
    public FileName: string,
    public ModifiedFileName: string
  ) {}
}
