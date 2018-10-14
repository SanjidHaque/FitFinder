import {Stage} from './stage.model';
import {Applicant} from './applicant.model';

export class Job {
 constructor(public id: string,
             public companyId: string,
             public departmentId: string,
             public name: string,
             public stages: Stage[],
             public applicants: Applicant[]
             ) { }
}
