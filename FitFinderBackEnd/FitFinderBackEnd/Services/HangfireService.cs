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

        public HangfireService()
        {
            _context = new ApplicationDbContext();
        }

        public void CreateNewCandidates(List<string> filePaths, long jobId)
        {
             BackgroundJob.Enqueue(() => OnCreateNewCandidates(filePaths, jobId));
        }
        public void OnCreateNewCandidates(List<string> filePaths, long jobdId)   
        {
            //Candidate candidate = new Candidate
            //{
            //    FirstName = "Asif Atick",
            //    Mobile = "01966168250",
            //    Email = "sanjidulhaque@gmail.com",
            //    SourceId = 1
            //};

            //_context.Candidates.Add(candidate);
            //_context.SaveChanges();

       //     string url = "http://122.248.222.23:7712/api/v1/upload-cv";
            ////string urlParameters = "";


            ////HttpClient client = new HttpClient();
            ////client.BaseAddress = new Uri(url);


            ////client.DefaultRequestHeaders.Accept.Add(
            ////    new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));


            ////HttpResponseMessage response = client.GetAsync(httpPostedFile).Result;  
            ////if (response.IsSuccessStatusCode)
            ////{

            ////}
            ////else
            ////{

            ////}

            ////client.Dispose();


            ////HttpContent stringContent = new StringContent(paramString);
            ////HttpContent fileStreamContent = new StreamContent(httpPostedFile);
            ////HttpContent bytesContent = new ByteArrayContent(paramFileBytes);
            ////using (var client = new HttpClient())
            ////using (var formData = new MultipartFormDataContent())
            ////{
            ////    formData.Add(stringContent, "param1", "param1");
            ////    formData.Add(fileStreamContent, "file1", "file1");
            ////    formData.Add(bytesContent, "file2", "file2");
            ////    var response = await client.PostAsync(actionUrl, formData);
            ////    if (!response.IsSuccessStatusCode)
            ////    {
            ////        return null;
            ////    }
            ////    return await response.Content.ReadAsStreamAsync();

            //  var fileName = "Sanjid.docx";
            //  var filePath = HttpContext.Current.Server.MapPath("~/Content/Attachments/" + fileName);

            //    filePath = "@" + filePath;http://122.248.222.23:7712/api/v1/upload-cv
            //using (WebClient client = new WebClient())
            //{
            //    client.Headers[HttpRequestHeader.ContentType] = "application/octet-stream";
            //    byte[] response = client.UploadFile(url, filePath);
            //}


            filePaths.ForEach(filePath =>
            { 
                RestClient restClient = new RestClient("http://122.248.222.23:7712");
                RestRequest request = new RestSharp.RestRequest("api/v1/upload-cv", RestSharp.Method.POST);
                request.AlwaysMultipartFormData = true;
                request.AddHeader("Content-Type", "multipart/form-data");
                request.AddFile("cv", filePath);
                CandidateResponseContent candidateResponseContent = restClient.Execute<CandidateResponseContent>(request).Data;

                Candidate candidate = new Candidate
                {
                    FirstName = "Asif Atick",
                    Mobile = "01966168250",
                    Email = "sanjidulhaque@gmail.com",
                    SourceId = 1
                };

                _context.Candidates.Add(candidate);
                _context.SaveChanges();
            });
        }
    }
}

