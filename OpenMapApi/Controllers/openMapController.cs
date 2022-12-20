using Microsoft.AspNetCore.Mvc;
//using Dapper;
using OpenMapRepo.Repository;

namespace OpenMapApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OpenMapController : ControllerBase
    {
        private readonly IOpenMap _repository;

        public OpenMapController(IOpenMap repository)
        {
            _repository = repository;
        }
        

        [HttpGet]
        public async Task<IActionResult> Get(int SearchPageNumber, string SearchText)
        {
            var places = await _repository.SearchAllPlaces(SearchPageNumber, SearchText);

            return places.Any() ? Ok(places) : NoContent();
        }

        [HttpGet("id")]
        public async Task<IActionResult> Get(int id)
        {
            var place = await _repository.SearchPlace(id);

            return place != null 
                ? Ok(place) 
                : NotFound("Registro não encontrado. Entre em contato com o suporte.");
        }



    }
}