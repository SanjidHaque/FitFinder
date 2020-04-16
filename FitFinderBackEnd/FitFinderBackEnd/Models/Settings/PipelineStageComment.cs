namespace FitFinderBackEnd.Models.Settings
{
    public class PipelineStageComment
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public PipelineStageScore PipelineStageScore { get; set; }
        public long? StageScoreId { get; set; }  
    }
}