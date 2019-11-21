using System.ComponentModel.DataAnnotations;

namespace FitFinderBackEnd.Models.Shared
{
    public class Attachment
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string ModifiedFileName { get; set; }
    }
}