import {CandidateEducation} from './candidate-education.model';
import {CandidateExperience} from './candidate-experience.model';
import {CandidateAttachment} from './candidate-attachment.model';

export class Candidate {
  constructor(
    public id: string,
    public jobId: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public mobile: string,
    public address: string,
    public city: string,
    public state: string,
    public country: string,
    public candidateSourceId: string,
    public candidateEducation: CandidateEducation[] = [],
    public candidateExperience: CandidateExperience[] = [],
    public candidateAttachment: CandidateAttachment[] = [],
    public facebookUrl: string,
    public linkedInUrl: string,
    public isArchived: boolean,
    public isHired: boolean,
    public isClosed: boolean,
    public applicationDate: string
  ) { }
}
