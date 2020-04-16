import {JobAssignment} from './job-assignment.model';

export class GeneralComment {
  constructor(
    public Id: number,
    public Comment: string,
    public JobAssignment: JobAssignment,
    public JobAssignmentId: number
  ) {}
}
