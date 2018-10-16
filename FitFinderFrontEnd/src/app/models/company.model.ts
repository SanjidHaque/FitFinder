import {Department} from './department.model';

export class Company {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public departments: Department[]
  ) {}
}
