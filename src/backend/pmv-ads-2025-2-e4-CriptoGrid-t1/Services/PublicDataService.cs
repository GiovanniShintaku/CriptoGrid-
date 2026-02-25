using pmv_ads_2025_2_e4_CriptoGrid_t1.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using MongoDB.Bson;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Services
{
    public class PublicDataService
    {
        private readonly IMongoCollection<CoinData> _CoinDataCollection;

        public PublicDataService(IOptions<CriptoGridDatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var db = client.GetDatabase(settings.Value.DataBaseName);

            _CoinDataCollection = db.GetCollection<CoinData>(settings.Value.CoinDataCollectionName);

            _ = EnsureIndexesExistAsync();
        }

        public async Task<List<CoinData>> GetAllAsync()
        {
            var pipeline = new[]
            {
                new BsonDocument("$addFields", new BsonDocument
                {
                    { "NormalizedId", new BsonDocument("$ifNull", new BsonArray { "$CoinGeckoId", "$coin_id", "$id" }) }
                }),
                new BsonDocument("$match", new BsonDocument("NormalizedId", new BsonDocument("$ne", BsonNull.Value))),
                new BsonDocument("$sort", new BsonDocument
                {
                    { "NormalizedId", 1 },
                    { "IngestionDate", -1 }
                }),
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", "$NormalizedId" },
                    { "doc", new BsonDocument("$first", "$$ROOT") }
                }),
                new BsonDocument("$replaceRoot", new BsonDocument("newRoot", "$doc")),
                new BsonDocument("$sort", new BsonDocument("MarketCapRank", 1))
            };

            var docs = await _CoinDataCollection.Aggregate<BsonDocument>(pipeline).ToListAsync();

            var list = docs.Select(d =>
            {
                d.Remove("NormalizedId");
                return MongoDB.Bson.Serialization.BsonSerializer.Deserialize<CoinData>(d);
            }).ToList();

            return list;
        }

        public async Task<List<CoinData>> GetHistoryByTimeframeAsync(string coinId, string timeframe)
        {
            var startDate = CalculateStartDate(timeframe);

            var filter = Builders<CoinData>.Filter.And(
                Builders<CoinData>.Filter.Eq(c => c.CoinGeckoId, coinId),
                Builders<CoinData>.Filter.Gte(c => c.IngestionDate, startDate)
            );

            return await _CoinDataCollection
                .Find(filter)
                .SortBy(c => c.IngestionDate)
                .ToListAsync();
        }

        public async Task EnsureIndexesExistAsync()
        {
            var keys = Builders<CoinData>.IndexKeys
                .Ascending(c => c.CoinGeckoId)
                .Descending(c => c.IngestionDate);

            var model = new CreateIndexModel<CoinData>(keys,
                new CreateIndexOptions { Name = "idx_coinId_ingestionDate" });

            await _CoinDataCollection.Indexes.CreateOneAsync(model);
        }

        private DateTime CalculateStartDate(string timeframe)
        {
            DateTime startDate = DateTime.UtcNow;

            switch (timeframe.ToLower())
            {
                case "1d": startDate = startDate.AddDays(-1); break;
                case "7d": startDate = startDate.AddDays(-7); break;
                case "30d": startDate = startDate.AddDays(-30); break;
                case "3m": startDate = startDate.AddMonths(-3); break;
                case "1y": startDate = startDate.AddYears(-1); break;
                default: throw new ArgumentException("Timeframe inválido. Use 1d, 7d, 30d, 3m ou 1y.");
            }

            return startDate;
        }
    }
}