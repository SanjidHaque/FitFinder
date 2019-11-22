import {Pipeline} from './pipeline.model';
import {Company} from './company.model';

export class Workflow {
  constructor (
    public Id: number,
    public Name: string,
    public Company: Company,
    public CompanyId: number,
    public Pipelines: Pipeline[]
  ) {}
}
