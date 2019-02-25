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

            dynamic MailMessage = new MailMessage();
            MailMessage.From = new MailAddress("1602gub@gmail.com");
            MailMessage.To.Add(message.Destination);
            MailMessage.Subject = message.Subject;
            MailMessage.IsBodyHtml = true;
            MailMessage.Body = message.Body;

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", Convert.ToInt32(587));
            smtpClient.Credentials = new System.Net.NetworkCredential("1602gub@gmail.com", "_-@)!*2018NoDe>jS2018@)!*-_");

            try
            {
                try
                {
                    smtpClient.Send(MailMessage);

                }
                catch (Exception ex)
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
                        smtpClient.Send(MailMessage);
                    }
                }
            }

        }
    }
 }

