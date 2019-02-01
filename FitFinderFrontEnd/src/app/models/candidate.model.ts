import {CandidateEducation} from './candidate-education.model';
import {CandidateExperience} from './candidate-experience.model';
import {CandidateAttachment} from './canidate-attachment.model';
import {PipelineStageCriteriaStarRating} from './pipeline-stage-criteria-star-rating.model';
import {PipelineStageStarRating} from './pipeline-stage-star-rating.model';

export class Candidate {
   Id: number;
   JobId: number;
   FirstName: string;
   LastName: string;
   Email: string;
   Mobile: string;
   Address: string;
   City: string;
   State: string;
   Country: string;
   SourceId: number;
   CandidateEducation: CandidateEducation[];
   CandidateExperience: CandidateExperience[];
   CandidateAttachment: CandidateAttachment[];
   FacebookUrl: string;
   LinkedInUrl: string;
   IsArchived: boolean;
   IsHired: boolean;
   IsClosed: boolean;
   ApplicationDate: string;
   IsFavourite: boolean;
   PipelineStageStarRating: PipelineStageStarRating[];
   PipelineStageCriteriaStarRating: PipelineStageCriteriaStarRating[];

  constructor(
     id: number,
     jobId: number,
     firstName: string,
     lastName: string,
     email: string,
     mobile: string,
     address: string,
     city: string,
     state: string,
     country: string,
     sourceId: number,
     candidateEducation: CandidateEducation[] = [],
     candidateExperience: CandidateExperience[] = [],
     candidateAttachment: CandidateAttachment[] = [],
     facebookUrl: string,
     linkedInUrl: string,
     isArchived: boolean,
     isHired: boolean,
     isClosed: boolean,
     applicationDate: string,
     isFavourite: boolean,
     pipelineStageStarRating: PipelineStageStarRating[] = [],
     pipelineStageCriteriaStarRating: PipelineStageCriteriaStarRating[] = []
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
    this.SourceId = sourceId;
    this.CandidateEducation = candidateEducation;
    this.CandidateExperience = candidateExperience;
    this.CandidateAttachment = candidateAttachment;
    this.FacebookUrl = facebookUrl;
    this.LinkedInUrl = linkedInUrl;
    this.IsArchived = isArchived;
    this.IsHired = isHired;
    this.IsClosed = isClosed;
    this.ApplicationDate = applicationDate;
    this.IsFavourite = isFavourite;
    this.PipelineStageStarRating = pipelineStageStarRating;
    this.PipelineStageCriteriaStarRating = pipelineStageCriteriaStarRating;
  }
}
