using System.Net;
using System.Net.Http.Json;
using MongoDB.Driver;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using DataIngest_CoinGecko.Models;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IMongoCollection<CoinData> _coinCollection;

    private const string ApiUrl =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";

    public Worker(
        ILogger<Worker> logger,
        IHttpClientFactory httpClientFactory,
        IMongoCollection<CoinData> coinCollection)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
        _coinCollection = coinCollection;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("DataIngest_CoinGecko iniciado.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await IngestDataAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro na execução do DataIngest_CoinGecko.");
            }

            _logger.LogInformation("Aguardando 6 horas para a próxima execução...");
            await Task.Delay(TimeSpan.FromHours(6), stoppingToken);
        }
    }

    private async Task IngestDataAsync(CancellationToken ct)
    {
        var httpClient = _httpClientFactory.CreateClient("CoinGecko");
        _logger.LogInformation("Buscando dados de mercado...");

        const int delayMs = 2200; // 30 req/min máx
        const int maxRetries = 3;

        for (int attempt = 1; attempt <= maxRetries; attempt++)
        {
            try
            {
                var response = await httpClient.GetAsync(ApiUrl, ct);

                if (response.StatusCode == HttpStatusCode.TooManyRequests)
                {
                    _logger.LogWarning("Limite de requisições atingido. Aguardando 60 segundos antes de tentar novamente...");
                    await Task.Delay(TimeSpan.FromSeconds(60), ct);
                    continue;
                }

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Falha ao buscar dados: {StatusCode}", response.StatusCode);
                    return;
                }

                var coins = await response.Content.ReadFromJsonAsync<List<CoinData>>(cancellationToken: ct);
                if (coins == null || coins.Count == 0)
                {
                    _logger.LogWarning("Nenhum dado retornado da API.");
                    return;
                }

                _logger.LogInformation("{Count} moedas obtidas. Inserindo/atualizando MongoDB...", coins.Count);

                foreach (var coin in coins)
                {
                    coin.IngestionDate = DateTime.UtcNow;

                    var filter = Builders<CoinData>.Filter.Eq(c => c.CoinGeckoId, coin.CoinGeckoId);
                    var update = Builders<CoinData>.Update
                        .Set(c => c.Symbol, coin.Symbol)
                        .Set(c => c.Name, coin.Name)
                        .Set(c => c.Image, coin.Image)
                        .Set(c => c.CurrentPrice, coin.CurrentPrice)
                        .Set(c => c.MarketCap, coin.MarketCap)
                        .Set(c => c.MarketCapRank, coin.MarketCapRank)
                        .Set(c => c.TotalVolume, coin.TotalVolume)
                        .Set(c => c.PriceChangePercentage24h, coin.PriceChangePercentage24h)
                        .Set(c => c.LastUpdated, coin.LastUpdated)
                        .Set(c => c.IngestionDate, coin.IngestionDate);

                    await _coinCollection.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true }, ct);

                    await Task.Delay(delayMs, ct);
                }

                _logger.LogInformation("Ingestão concluída com sucesso.");
                return;
            }
            catch (Exception ex) when (attempt < maxRetries)
            {
                _logger.LogWarning(ex, "Erro na tentativa {Attempt}. Retentando em 10 segundos...", attempt);
                await Task.Delay(TimeSpan.FromSeconds(10), ct);
            }
        }

        _logger.LogError("Falha após {MaxRetries} tentativas de obter dados do CoinGecko.", maxRetries);
    }
}