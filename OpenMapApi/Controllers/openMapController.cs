using Microsoft.AspNetCore.Mvc;
using OpenMapRepo.Model;
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

        [HttpPost]
        public async Task<IActionResult> Post(OpenMapRequest request)
        {
            if (
                string.IsNullOrEmpty(request.NamePlace)
                || string.IsNullOrEmpty(request.NameUf)
                || string.IsNullOrEmpty(request.NameCity)
                || string.IsNullOrEmpty(request.DescPlace)
            )
            {
                return BadRequest("Informações inválidas. Entre em contato com o suporte");
            }

            var requestResponse = await _repository.AddPlace(request);

            return requestResponse 
                ? Ok(requestResponse) 
                : BadRequest("Ocorreu uma situação. Favor entrar em contato com o suporte se o erro persistir.");
        }

        [HttpPut("id")]
        public async Task<IActionResult> Put(OpenMapRequest request, int id)
        {
            if(id <= 0)
            {
                return BadRequest("Registro Inválido. Favor entrar em contato com o suporte.");
            }

            var place = await _repository.SearchPlace(id);

            if(place == null) {
                return NotFound("Registro não encontrado. Entre em contato o suporte.");
            }

            var atualizado = await _repository.UpdatePlace(request, id);
            return atualizado
                ? Ok("Local atualizado com sucesso")
                : BadRequest("Não foi possível atualizar o item. Entre em contato com o suporte");
        }

        [HttpDelete("id")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Registro Inválido. Favor entrar em contato com o suporte.");
            }

            var place = await _repository.SearchPlace(id);

            if (place == null)
            {
                return NotFound("Registro não encontrado. Entre em contato o suporte.");
            }

            var atualizado = await _repository.DeletePlace(id);
            return atualizado
                ? Ok("Local apagado com sucesso")
                : BadRequest("Não foi possível apagar o item. Entre em contato com o suporte");
        }

    }
}