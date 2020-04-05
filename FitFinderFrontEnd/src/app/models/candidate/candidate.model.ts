import {CandidateEducation} from './candidate-education.model';
import {CandidateExperience} from './candidate-experience.model';
import {CandidateAttachment} from './canidate-attachment.model';
import {JobAssignment} from './job-assignment.model';
import {Source} from '../settings/source.model';
import {Company} from '../settings/company.model';

export class Candidate {
  constructor(
    public Id: number,
    public FirstName: string,
    public LastName: string,
    public Email: string,
    public Mobile: string,
    public Address: string,
    public City: string,
    public State: string,
    public Country: string,
    public Source: Source,
    public SourceId: number,
    public CandidateEducations: CandidateEducation[],
    public CandidateExperiences: CandidateExperience[],
    public CandidateAttachments: CandidateAttachment[],
    public JobAssignments: JobAssignment[],
    public FacebookUrl: string,
    public LinkedInUrl: string,
    public GitHubUrl: string,
    public IsArchived: boolean,
    public IsHired: boolean,
    public IsClosed: boolean,
    public ApplicationDate: string,
    public IsFavourite: boolean,
    public CandidateImagePath: string,
    public Company: Company,
    public CompanyId: number
  ) { }
}
