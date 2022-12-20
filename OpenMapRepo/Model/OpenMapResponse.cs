namespace OpenMapRepo.Model;


public class OpenMapResponse
{
    public int IdPlace { get; set; }

    public string? NamePlace { get; set; }

    public string? DescPlace { get; set; }

    public string? NameUf { get; set; }

    public string? NameCity { get; set; }

    public string? PhotoUrl { get; set; }

    public DateTime DateInserted { get; set; }

    public DateTime DateUpdated { get; set; }

    public int TotalRecords { get; set; }

}
