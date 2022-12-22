using OpenMapRepo.Interfaces;
using OpenMapRepo.Model;
using Newtonsoft.Json;

namespace OpenMapRepo.Services
{
    public class OpenMapService : IOpenMapService
    {
        private static readonly HttpClient client = new HttpClient();
        private readonly IOpenMapRepository _repository;

        public OpenMapService(IOpenMapRepository repository)
        {
            _repository = repository;
        }

        public Task<bool> AddPlace(OpenMapRequest request)
        {
            return _repository.AddPlace(request);
        }

        public Task<bool> DeletePlace(int idPlace)
        {
            return _repository.DeletePlace(idPlace);
        }

        public Task<IEnumerable<OpenMapResponse>> SearchAllPlaces(int SearchPageNumber, string? searchText)
        {
            return _repository.SearchAllPlaces(SearchPageNumber, searchText);
        }

        public Task<OpenMapResponse> SearchPlace(int IdPlace)
        {
            return _repository.SearchPlace(IdPlace);
        }

        public Task<bool> UpdatePlace(OpenMapRequest request, int id)
        {
            return _repository.UpdatePlace(request, id);
        }

        public async Task<IEnumerable<String>> GetCities(string? inputValue)
        {
            string? url = $"https://servicodados.ibge.gov.br/api/v1/localidades/estados/{inputValue}/municipios";

            HttpResponseMessage response = await client.GetAsync(url);



            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                List<CityResponse> cityList = JsonConvert.DeserializeObject<List <CityResponse>> (json);

                List<string> cityNames = new List<string>();

                foreach(CityResponse record in cityList)
                {
                    cityNames.Add(record.Nome);
                }

                return cityNames;
            }
            else
            {
                // Trate a resposta de erro aqui, como lançar uma exceção ou retornar um valor de erro
                throw new Exception("Erro ao obter municípios");
            }
        }
    }
}
