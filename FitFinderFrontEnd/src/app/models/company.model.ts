import {Department} from './department.model';

export class Company {
  constructor(
    public id: string,
    public name: string,
    public departments: Department[]
  ) {}
}
