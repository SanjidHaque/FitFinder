import {Attachment} from '../shared/attachment.model';

export class JobAttachment extends Attachment {
  constructor(
    public Id: number,
    public JobId: number
  ) {}
}
