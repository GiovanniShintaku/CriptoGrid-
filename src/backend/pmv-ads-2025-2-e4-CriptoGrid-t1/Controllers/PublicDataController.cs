using pmv_ads_2025_2_e4_CriptoGrid_t1.Models;
using pmv_ads_2025_2_e4_CriptoGrid_t1.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PublicDataController : ControllerBase
    {
        private readonly PublicDataService _publicDataService;

        public PublicDataController(PublicDataService publicDataService)
        {
            _publicDataService = publicDataService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CoinData>>> GetAll()
        {
            var coins = await _publicDataService.GetAllAsync();

            if (coins == null || coins.Count == 0)
                return NotFound(new { Message = "Nenhum dado encontrado." });

            return Ok(coins);
        }

        [HttpGet("{coinId}/history")]
        public async Task<IActionResult> GetHistoricalData(string coinId, [FromQuery] string timeframe)
        {
            if (string.IsNullOrWhiteSpace(timeframe))
                return BadRequest("O parâmetro 'timeframe' é obrigatório para buscar dados históricos.");

            try
            {
                var data = await _publicDataService.GetHistoryByTimeframeAsync(coinId, timeframe);

                if (data == null || data.Count == 0)
                    return NotFound(new { Message = $"Nenhum dado histórico encontrado para '{coinId}' no período '{timeframe}'." });

                return Ok(data);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Erro interno ao processar a requisição.", Erro = ex.Message });
            }
        }
    }
}
