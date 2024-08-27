using System.ComponentModel.DataAnnotations;

namespace DinePulse_API.Models
{
    public class CustomerRegisterModel
    {
        [Required]
        [StringLength(100)]
        public string CustomerName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string CustomerEmail { get; set; }

        [Required]
        [StringLength(20)]
        public string CustomerPhone { get; set; }

        [Required]
        [StringLength(300, MinimumLength = 8)]
        public string CustomerPassword { get; set; }
    }
}
