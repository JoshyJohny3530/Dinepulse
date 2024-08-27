namespace DinePulse_API.Models
{
    public class RevenueReport
    {
        public string CustomerName { get; set; }
        public decimal TotalAmount { get; set; }
    }

    public class GrandTotal
    {
        public decimal GrandTotalAmount { get; set; }
    }

    public class RevenueReportResponse
    {
        public List<RevenueReport> RevenueReports { get; set; }
        public decimal GrandTotal { get; set; }
    }
}
