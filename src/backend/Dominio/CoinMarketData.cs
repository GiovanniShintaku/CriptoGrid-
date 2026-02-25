using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Models
{
    public class CoinMarketData
    {
        [BsonId]
        [BsonElement("_id")]
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [BsonElement("Symbol")]
        [JsonPropertyName("symbol")]
        public string Symbol { get; set; } = string.Empty;

        [BsonElement("Name")]
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("Image")]
        [JsonPropertyName("image")]
        public string? Image { get; set; }

        // --- Dados de Mercado (Retornados no nível raiz por /coins/markets) ---

        [BsonElement("CurrentPrice")]
        [JsonPropertyName("current_price")]
        public decimal? CurrentPrice { get; set; }

        [BsonElement("MarketCap")]
        [JsonPropertyName("market_cap")]
        public long? MarketCap { get; set; }

        [BsonElement("MarketCapRank")]
        [JsonPropertyName("market_cap_rank")]
        public int? MarketCapRank { get; set; }

        [BsonElement("High24h")]
        [JsonPropertyName("high_24h")]
        public decimal? High24h { get; set; }

        [BsonElement("Low24h")]
        [JsonPropertyName("low_24h")]
        public decimal? Low24h { get; set; }

        [BsonElement("PriceChangePercentage24h")]
        [JsonPropertyName("price_change_percentage_24h")]
        public decimal? PriceChangePercentage24h { get; set; }

        [BsonElement("PriceChangePercentage7dInCurrency")]
        [JsonPropertyName("price_change_percentage_7d_in_currency")]
        public decimal? PriceChangePercentage7dInCurrency { get; set; }

        [BsonElement("TotalVolume")]
        [JsonPropertyName("total_volume")]
        public long? TotalVolume { get; set; }

        // Data de atualização
        [BsonElement("LastUpdated")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        [JsonPropertyName("last_updated")]
        public DateTime? LastUpdated { get; set; }
    }
}