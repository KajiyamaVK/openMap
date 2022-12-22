namespace OpenMapApi
{
    public class City
    {
        public DateTime Date_inserted { get; set; }

        public DateTime Date_updated { get; set; }

        public int IdPlace { get; set; }

        public string? NameUf { get; set; }

        public string? NameCity { get; set; }

        public string? NamePlace { get; set; }

        public string? DescPlace { get; set; }

        public string? DescReference { get; set; }

        public int TotalRecords { get; set; }
    }
}