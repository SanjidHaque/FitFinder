using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.NLP;
using FitFinderBackEnd.Models.Settings;
using Hangfire;
using RestSharp;

namespace FitFinderBackEnd.Services
{
    public class HangfireService
    {
        ApplicationDbContext _context;
        private SharedService _sharedService;

        public HangfireService()
        {
            _context = new ApplicationDbContext();
            _sharedService = new SharedService();
        }

        public void CreateNewCandidates(List<dynamic> fileInformations, long jobId, long? companyId)
        {
             BackgroundJob.Enqueue(() => OnCreateNewCandidates(fileInformations, jobId, companyId));
        }
        public void OnCreateNewCandidates(List<dynamic> fileInformations, long jobdId, long? companyId)   
        {
            fileInformations.ForEach(fileInformation =>
            { 
                RestClient restClient = new RestClient("http://122.248.222.23:7712");
                RestRequest restRequest = new RestSharp.RestRequest("api/v1/upload-cv", Method.POST);
                restRequest.AlwaysMultipartFormData = true;
                restRequest.AddHeader("Content-Type", "multipart/form-data");
                restRequest.AddFile("cv", fileInformation.FileName);
               

                IRestResponse<CandidateResponseContent> candidateResponseContent =
                    ExecuteAsyncRequest<CandidateResponseContent>(restClient, restRequest)
                        .GetAwaiter()
                        .GetResult();


                // List<CandidateAttachment> candidateAttachments = new List<CandidateAttachment>
                // {
                //     new CandidateAttachment
                //     {
                //         Id = null,
                //         CandidateId = null,
                //         FileName = 
                //     }
                // };

                Candidate candidate = new Candidate
                {
                    FirstName = candidateResponseContent.Data.Name,
                    Mobile = candidateResponseContent.Data.contact,
                    Email = candidateResponseContent.Data.email,
                    SourceId = 1,
                    
                };



                _context.Candidates.Add(candidate);
                _context.SaveChanges();
            });
        }
        async Task<IRestResponse<T>> ExecuteAsyncRequest<T>(RestClient client, IRestRequest request) where T : class, new()
        {
            var taskCompletionSource = new TaskCompletionSource<IRestResponse<T>>();

            client.ExecuteAsync<T>(request, restResponse =>
            {
                if (restResponse.ErrorException != null)
                {
                    const string message = "Error retrieving response.";
                    throw new ApplicationException(message, restResponse.ErrorException);
                }

                taskCompletionSource.SetResult(restResponse);
            });

            return await taskCompletionSource.Task;
        }
    }
}

