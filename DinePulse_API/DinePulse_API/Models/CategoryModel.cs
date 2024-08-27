namespace DinePulse_API.Models
{
    public class CategoryModel
    {
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryDescription { get; set; }
        public string? CategoryImageBase64 { get; set; }
        public string? CategoryImage { get; set; }
    }
}
