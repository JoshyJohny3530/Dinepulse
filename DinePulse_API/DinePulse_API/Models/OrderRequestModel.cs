namespace DinePulse_API.Models
{
    public class OrderRequestModel
    {
        public int CustomerId { get; set; }
        public int TableId { get; set; }
        public int OrderTypeId { get; set; }
        public int StatusId { get; set; }
        public OrderDetail[] OrderDetails { get; set; }
    }
}
