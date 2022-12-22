using Microsoft.AspNetCore.Mvc;
//using Dapper;
//using OpenMapRepo.Repository;
using OpenMapRepo.Interfaces;
using System.Numerics;
//using OpenMapRepo.Services;

namespace OpenMapApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class fetchCitiesController : ControllerBase
    {
        private readonly IOpenMapService _services;

        public fetchCitiesController(IOpenMapService services)
        {
            _services = services;
        }


        [HttpGet]
        public async Task<IActionResult> GetCities(string id)
        {
            var cities = await _services.GetCities(id);

            return cities != null
                ? Ok(cities)
                : NotFound("Registro não encontrado. Entre em contato com o suporte.");
        }

    }
}