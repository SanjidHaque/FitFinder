import {Job} from './job.model';

export class JobAttachment {
  constructor(
    public Id: number,
    public FileName: string,
    public ModifiedFileName: string,
    public Job: Job,
    public JobId: number
  ) {}
}
