namespace DinePulse_API.Models
{
    public class ShopModel
    {
        public int ShopId { get; set; }
        public string? ShopName { get; set; }
        public string? ShopEmail { get; set; }
        public string? ShopPhoneNumber { get; set; }
        public string? ShopAddress { get; set; }
        public decimal TaxRate { get; set; }
    }
}
