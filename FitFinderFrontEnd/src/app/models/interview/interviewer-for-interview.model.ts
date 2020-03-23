import {Interview} from './interview.model';
import {UserAccount} from '../settings/user-account.model';

export class InterviewerForInterview {
  constructor(
    public Id: number,
    public Interview: Interview,
    public InterviewId: number,
    public UserAccount: UserAccount,
    public UserAccountId: string
  ) {}
}
