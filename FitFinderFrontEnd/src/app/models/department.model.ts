import {Job} from './job.model';

export class Department {
  constructor(
    public id: string,
    public name: string,
    public companyId: string,
    public jobs: Job[]
  ) {}
}
