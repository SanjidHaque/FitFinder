using FitFinderBackEnd.Models.Shared;

namespace FitFinderBackEnd.Models.Settings
{
    public class Source : Resource
    {
        public long? TotalCandidates { get; set; }
        public long? ActiveCandidates { get; set; }
        public long? HiredCandidates { get; set; }   
    }
}