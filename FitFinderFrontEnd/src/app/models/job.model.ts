export class Job {
  Id: string;
  JobTitle: string;

  constructor(
     id: string,
     jobTitle: string
  ) {

    this.Id = id;
    this.JobTitle = jobTitle;
  }
}
