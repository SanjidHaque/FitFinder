import {CandidateEducation} from './candidate-education.model';
import {CandidateExperience} from './candidate-experience.model';
import {CandidateAttachment} from './candidate-attachment.model';

export class Candidate {
   Id: string;
   JobId: string;
   FirstName: string;
   LastName: string;
   Email: string;
   Mobile: string;
   Address: string;
   City: string;
   State: string;
   Country: string;
   CandidateSourceId: string;
   CandidateEducation: CandidateEducation[];
   CandidateExperience: CandidateExperience[];
   CandidateAttachment: CandidateAttachment[];
   FacebookUrl: string;
   LinkedInUrl: string;
   IsArchived: boolean;
   IsHired: boolean;
   IsClosed: boolean;
   ApplicationDate: string;

  constructor(
     id: string,
     jobId: string,
     firstName: string,
     lastName: string,
     email: string,
     mobile: string,
     address: string,
     city: string,
     state: string,
     country: string,
     candidateSourceId: string,
     candidateEducation: CandidateEducation[] = [],
     candidateExperience: CandidateExperience[] = [],
     candidateAttachment: CandidateAttachment[] = [],
     facebookUrl: string,
     linkedInUrl: string,
     isArchived: boolean,
     isHired: boolean,
     isClosed: boolean,
     applicationDate: string
  ) {
    this.Id = id;
    this.JobId = jobId;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Email = email;
    this.Mobile = mobile;
    this.Address = address;
    this.City = city;
    this.State = state ;
    this.Country = country;
    this.CandidateSourceId = candidateSourceId;
    this.CandidateEducation = candidateEducation;
    this.CandidateExperience = candidateExperience;
    this.CandidateAttachment = candidateAttachment;
    this.FacebookUrl = facebookUrl;
    this.LinkedInUrl = linkedInUrl;
    this.IsArchived = isArchived;
    this.IsHired = isHired;
    this.IsClosed = isClosed;
    this.ApplicationDate = applicationDate;
  }
}
