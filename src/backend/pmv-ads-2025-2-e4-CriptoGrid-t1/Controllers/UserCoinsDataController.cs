using pmv_ads_2025_2_e4_CriptoGrid_t1.Models;
using pmv_ads_2025_2_e4_CriptoGrid_t1.Services;
using Microsoft.AspNetCore.Mvc;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserCoinsDataController : Controller
    {

        private readonly LoggedAreaDataService _loggedAreaDataService;

        public UserCoinsDataController(LoggedAreaDataService loggedAreaDataService)
        {
            _loggedAreaDataService = loggedAreaDataService;
        }

        [HttpGet("{Id:length(24)}")]
        public async Task<ActionResult<UserCoinsData>> Get(string id)
        {
            var user = await _loggedAreaDataService.GetAsync(id);
            if (user == null)
                return NotFound(new { Message = "Algo deu errado aqui" });
            return user;
        }


        [HttpPost]
        public async Task<IActionResult> Post(UserCoinsData newUserCoinsData)
        {
            await _loggedAreaDataService.CreateAsync(newUserCoinsData);
            return CreatedAtAction(nameof(Post), new { Id = newUserCoinsData.Id }, newUserCoinsData);
        }

        [HttpDelete("{Id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _loggedAreaDataService.GetAsync(id);
            if (user == null)
                return NotFound(new { Message = "Algo deu errado aqui" });
            await _loggedAreaDataService.DeleteAsync(id);
            return NoContent();
        }

        [HttpPut("{Id:length(24)}")]
        public async Task<IActionResult> Update(string id, UserCoinsData UpdateUserCoinsData)
        {
            var userCoinData = await _loggedAreaDataService.GetAsync(id);
            if (userCoinData == null)
                return NotFound(new { Message = "Algo deu errado" });

            UpdateUserCoinsData.Id = userCoinData.Id;

            await _loggedAreaDataService.UpdateAsync(id, UpdateUserCoinsData);
            return NoContent();
        }

    }
}
