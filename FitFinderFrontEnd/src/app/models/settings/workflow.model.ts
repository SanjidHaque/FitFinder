import {Pipeline} from './pipeline.model';
import {Resource} from '../shared/resource.model';

export class Workflow extends Resource {
  constructor (
    public Pipelines: Pipeline[]
  ) {}
}
