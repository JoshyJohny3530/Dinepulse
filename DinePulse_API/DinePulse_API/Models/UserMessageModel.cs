namespace DinePulse_API.Models
{
    public class UserMessageModel
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required  string PhoneNumber { get; set; }
        public required string Message { get; set; }
    }
}
