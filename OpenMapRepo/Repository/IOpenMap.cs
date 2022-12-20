using OpenMapRepo.Model;

namespace OpenMapRepo.Repository
{
    public interface IOpenMap
    {

        Task<IEnumerable<OpenMapResponse>> SearchAllPlaces(int SearchPageNumber, string searchText);

        Task<IEnumerable<OpenMapResponse>> SearchPlaces(string SearchText);

        Task <OpenMapResponse> SearchPlace(int IdPlace);

        Task<bool> AddPlace(OpenMapRequest request);

        Task<bool> UpdatePlace(OpenMapRequest request, int idPlace);

        Task<bool> DeletePlace(int idPlace);    
    }
}
