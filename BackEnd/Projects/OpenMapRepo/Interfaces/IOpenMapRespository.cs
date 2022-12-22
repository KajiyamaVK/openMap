using OpenMapRepo.Model;

namespace OpenMapRepo.Interfaces
{
    public interface IOpenMapRepository
    {

        Task<IEnumerable<OpenMapResponse>> SearchAllPlaces(int SearchPageNumber, string? searchText);

        Task<OpenMapResponse> SearchPlace(int IdPlace);

        Task<bool> AddPlace(OpenMapRequest request);

        Task<bool> UpdatePlace(OpenMapRequest request, int id);

        Task<bool> DeletePlace(int idPlace);
    }
}
