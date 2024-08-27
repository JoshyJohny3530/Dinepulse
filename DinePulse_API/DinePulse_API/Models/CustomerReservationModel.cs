using System.ComponentModel.DataAnnotations;

namespace DinePulse_API.Models
{
    public class CustomerReservationModel
    {
       
        public int GuestCount { get; set; }
       
        public required string CustomerEmail { get; set; }
        [Required]
        public required string CustomerPhone { get; set; }
        [Required]
        public required string ReservationDate { get; set; }
        [Required]
        public required string ReservationTime { get; set; }
        [Required]
        public required string CustomerSuggestion { get; set; }
    }
}
