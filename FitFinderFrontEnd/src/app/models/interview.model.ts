import {CandidatesForInterview} from './candidates-for-interview.model';
import {InterviewersForInterview} from './interviewers-for-interview.model';

export class Interview {
   Id: number;
   InterviewDate: string;
   InterviewName: string;
   InterviewLocation: string;
   InterviewStartTime: string;
   InterviewEndTime: string;
   InterviewTypeId: number;
   CandidatesForInterview: CandidatesForInterview[] = [];
   InterviewersForInterview: InterviewersForInterview[] = [];
   InterviewStatusId: number;
   IsArchived: boolean;

  constructor (
     id: number,
     interviewDate: string,
     interviewName: string,
     interviewLocation: string,
     interviewStartTime: string,
     interviewEndTime: string,
     interviewTypeId: number,
     candidatesForInterview: CandidatesForInterview[] = [],
     interviewersForInterview: InterviewersForInterview[] = [],
     interviewStatusId: number,
     isArchived: boolean
  ) {

    this.Id = id;
    this.InterviewDate = interviewDate;
    this.InterviewName = interviewName;
    this.InterviewLocation = interviewLocation;
    this.InterviewStartTime = interviewStartTime;
    this.InterviewEndTime = interviewEndTime;
    this.InterviewTypeId =  interviewTypeId;
    this.CandidatesForInterview = candidatesForInterview;
    this.InterviewersForInterview = interviewersForInterview;
    this.InterviewStatusId = interviewStatusId;
    this.IsArchived = isArchived;
  }
}
