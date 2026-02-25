using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.Extensions.Logging;
using DataIngest_CoinGecko.Models;
using System.Text.Json;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace CriptoGrid_BackfillWorker.Services
{
    public class BackfillService
    {
        private readonly IMongoCollection<CoinData> _coinData;
        private readonly ILogger<BackfillService> _logger;
        private readonly IHttpClientFactory _httpFactory;

        private const string ApiUrl =
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";

        public BackfillService(IMongoClient client, ILogger<BackfillService> logger, IHttpClientFactory httpFactory)
        {
            var db = client.GetDatabase("CriptoGrid");
            _coinData = db.GetCollection<CoinData>("CoinData");
            _logger = logger;
            _httpFactory = httpFactory;
        }

        public async Task RunAsync(CancellationToken ct)
        {
            var today = DateTime.UtcNow.Date;
            var startDate = today.AddDays(-90);
            var existingDays = await GetExistingDaysAsync(startDate, today);

            var allDays = Enumerable.Range(0, 91)
                .Select(i => today.AddDays(-i).Date)
                .ToList();

            var missingDays = allDays
                .Where(d => !existingDays.Contains(d))
                .ToList();

            _logger.LogInformation("Dias faltantes encontrados: {count}", missingDays.Count);

            if (missingDays.Count == 0)
            {
                _logger.LogInformation("Nenhum dia faltando. Encerrando.");
                return;
            }

            foreach (var date in missingDays)
            {
                _logger.LogInformation("Iniciando ingestão para {date:yyyy-MM-dd}", date);
                await IngestDayAsync(date, ct);
                await Task.Delay(2500, ct);
            }
        }

        private async Task<List<DateTime>> GetExistingDaysAsync(DateTime start, DateTime end)
        {
            var pipeline = new[]
            {
                new BsonDocument("$match", new BsonDocument
                {
                    { "ingestion_date", new BsonDocument
                        {
                            { "$gte", start },
                            { "$lte", end }
                        }
                    }
                }),
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument("$dateToString",
                        new BsonDocument { { "format", "%Y-%m-%d" }, { "date", "$ingestion_date" } })
                    }
                })
            };

            var results = await _coinData.AggregateAsync<BsonDocument>(pipeline);
            var list = await results.ToListAsync();
            return list.Select(d => DateTime.Parse(d["_id"].AsString)).ToList();
        }

        private async Task IngestDayAsync(DateTime date, CancellationToken ct)
        {
            try
            {
                var client = _httpFactory.CreateClient("CoinGecko");
                var response = await client.GetAsync(ApiUrl, ct);
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync(ct);
                var coins = JsonSerializer.Deserialize<List<CoinData>>(json,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (coins == null || coins.Count == 0)
                {
                    _logger.LogWarning("Nenhum dado retornado para {date}", date);
                    return;
                }

                foreach (var c in coins)
                    c.IngestionDate = date;

                await _coinData.InsertManyAsync(coins, cancellationToken: ct);
                _logger.LogInformation("Inseridos {count} registros para {date}", coins.Count, date);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Erro HTTP ({message}) ao processar {date}", ex.Message, date);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao processar {date}", date);
            }
        }
    }
}