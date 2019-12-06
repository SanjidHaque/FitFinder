using System;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;


namespace FitFinderBackEnd.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await configSendGridasync(message);
        }

        private async Task configSendGridasync(IdentityMessage message)
        {

            dynamic mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("info.fitfinder@gmail.com");
            mailMessage.To.Add(message.Destination);
            mailMessage.Subject = message.Subject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = message.Body;

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", Convert.ToInt32(587));
            smtpClient.Credentials = new System.Net.NetworkCredential("info.fitfinder@gmail.com", "fitfinder123");

            try
            {
                try
                {
                    smtpClient.Send(mailMessage);

                }
                catch (Exception)
                {
                    
                }
            }
            catch (SmtpFailedRecipientsException ex)
            {
                for (int i = 0; i <= ex.InnerExceptions.Length; i++)
                {
                    SmtpStatusCode status = ex.StatusCode;
                    if ((status == SmtpStatusCode.MailboxBusy) | (status == SmtpStatusCode.MailboxUnavailable))
                    {
                        System.Threading.Thread.Sleep(5000);
                        smtpClient.Send(mailMessage);
                    }
                }
            }

        }
    }
 }

