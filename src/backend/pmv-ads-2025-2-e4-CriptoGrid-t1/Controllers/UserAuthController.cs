using pmv_ads_2025_2_e4_CriptoGrid_t1.Models;
using pmv_ads_2025_2_e4_CriptoGrid_t1.Services;
using Microsoft.AspNetCore.Mvc;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAuthController : ControllerBase
    {
        private readonly LoginService _loginService;    

        public UserAuthController(LoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpGet("{Id:length(24)}")]
        public async Task<ActionResult<UserAuthData>> Get(string id) 
        { 
           var user = await _loginService.GetAsync(id);
            if (user == null)
                return NotFound(new {Message = "Algo deu errado aqui"});
            return Ok(user);
        }
            

        [HttpPost]
        public async Task<IActionResult> Post(UserAuthData newUserAuthData)
        {
           await _loginService.CreateAsync(newUserAuthData);
           return CreatedAtAction(nameof(Post), new {Id = newUserAuthData.Id}, newUserAuthData);
        }

        [HttpDelete("{Id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
           var user = await _loginService.GetAsync(id);
            if (user == null)  
                return NotFound(); 
            await _loginService.DeleteAsync(id);
            return NoContent ();
        }

    }
}
