import {Pipeline} from './pipeline.model';

export class Workflow {
  constructor (
    public Id: number,
    public Name: string,
    public CompanyId: number,
    public Pipelines: Pipeline[]
  ) {}
}
