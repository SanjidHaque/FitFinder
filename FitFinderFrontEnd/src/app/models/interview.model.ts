import {CandidatesForInterview} from './candidates-for-interview.model';
import {InterviewersForInterview} from './interviewers-for-interview.model';

export class Interview {
   Id: string;
   InterviewDate: string;
   InterviewName: string;
   InterviewLocation: string;
   InterviewStartTime: string;
   InterviewEndTime: string;
   InterviewTypeId: string;
   CandidatesForInterview: CandidatesForInterview[] = [];
   InterviewersForInterview: InterviewersForInterview[] = [];
   InterviewStatus: string;
   IsArchived: boolean;

  constructor (
     id: string,
     interviewDate: string,
     interviewName: string,
     interviewLocation: string,
     interviewStartTime: string,
     interviewEndTime: string,
     interviewTypeId: string,
     candidatesForInterview: CandidatesForInterview[] = [],
     interviewersForInterview: InterviewersForInterview[] = [],
     interviewStatus: string,
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
    this.InterviewStatus = interviewStatus;
    this.IsArchived = isArchived;
  }
}
