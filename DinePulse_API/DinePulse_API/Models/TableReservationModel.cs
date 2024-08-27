namespace DinePulse_API.Models
{
    public class TableReservationModel
    {
        public int ReservationId { get; set; }
        public int TableId { get; set; }
        public DateTime ReservationDate { get; set; }
        public int CustomerId { get; set; }
        public int SlotId { get; set; }
        public string Status { get; set; }
    }
}
