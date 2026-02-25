using System.Net;
using System.Net.Http.Json;
using MongoDB.Driver;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using DataIngest_CoinGecko.Models; 

namespace OHLCIngest 
{
    public class OhlcWorker : BackgroundService 
    {
        private readonly ILogger<OhlcWorker> _logger;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMongoCollection<CoinData> _coinCollection;

        private const string OhlcUrlTemplate = "https://api.coingecko.com/api/v3/coins/{0}/ohlc?vs_currency=usd&days=1";

        public OhlcWorker(
            ILogger<OhlcWorker> logger,
            IHttpClientFactory httpClientFactory,
            IMongoCollection<CoinData> coinCollection)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
            _coinCollection = coinCollection;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("OHLCIngest_CoinGecko iniciado.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ProcessAllCoinsAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Erro na execução do OHLCIngest_CoinGecko.");
                }

                _logger.LogInformation("Aguardando 24 horas para a próxima execução...");
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }
        }

        private async Task ProcessAllCoinsAsync(CancellationToken ct)
        {
            var httpClient = _httpClientFactory.CreateClient("CoinGecko");

            var coins = await _coinCollection
                .Find(_ => true)
                .Project(c => c.CoinGeckoId)
                .ToListAsync(ct);

            if (coins.Count == 0)
            {
                _logger.LogWarning("Nenhuma moeda encontrada no MongoDB.");
                return;
            }

            _logger.LogInformation("Processando OHLC para {Count} moedas...", coins.Count);

            const int delayMs = 2200; // 30 req/min
            const int maxRetries = 3;

            foreach (var coinId in coins)
            {
                if (ct.IsCancellationRequested) break;

                for (int attempt = 1; attempt <= maxRetries; attempt++)
                {
                    try
                    {
                        string url = string.Format(OhlcUrlTemplate, coinId);
                        var response = await httpClient.GetAsync(url, ct);

                        if (response.StatusCode == HttpStatusCode.TooManyRequests)
                        {
                            _logger.LogWarning("Limite de requisições atingido. Esperando 60s...");
                            await Task.Delay(TimeSpan.FromSeconds(60), ct);
                            continue;
                        }

                        if (!response.IsSuccessStatusCode)
                        {
                            _logger.LogWarning("Falha ao buscar OHLC de {CoinId}: {StatusCode}", coinId, response.StatusCode);
                            break;
                        }

                        var ohlcData = await response.Content.ReadFromJsonAsync<List<List<decimal>>>(cancellationToken: ct);
                        if (ohlcData == null || ohlcData.Count == 0)
                        {
                            _logger.LogWarning("Sem dados OHLC para {CoinId}.", coinId);
                            break;
                        }

                        var formatted = ohlcData.Select(item => new OhlcData
                        {
                            Timestamp = DateTimeOffset.FromUnixTimeMilliseconds((long)item[0]).UtcDateTime,
                            Open = item[1],
                            High = item[2],
                            Low = item[3],
                            Close = item[4]
                        }).ToList();

                        var filter = Builders<CoinData>.Filter.Eq(c => c.CoinGeckoId, coinId);
                        var update = Builders<CoinData>.Update.Set(c => c.Ohlc, formatted);

                        await _coinCollection.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = false }, ct);

                        _logger.LogInformation("OHLC atualizado para {CoinId}.", coinId);

                        await Task.Delay(delayMs, ct);
                        break; 
                    }
                    catch (Exception ex) when (attempt < maxRetries)
                    {
                        _logger.LogWarning(ex, "Erro ao buscar OHLC para {CoinId} (tentativa {Attempt})", coinId, attempt);
                        await Task.Delay(TimeSpan.FromSeconds(10), ct);
                    }
                }
            }

            _logger.LogInformation("Ingestão OHLC concluída com sucesso.");
        }
    }
}