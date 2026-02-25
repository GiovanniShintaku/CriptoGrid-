using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

public class CoinData
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? MongoId { get; set; }

    [JsonPropertyName("id")]
    [BsonElement("coin_id")]
    public string CoinGeckoId { get; set; } = string.Empty;

    [JsonPropertyName("symbol")]
    [BsonElement("Symbol")]
    public string Symbol { get; set; } = string.Empty;

    [BsonElement("Name")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("Image")]
    [JsonPropertyName("image")]
    public string Image { get; set; } = string.Empty;

    [BsonElement("CurrentPrice")]
    [JsonPropertyName("current_price")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal CurrentPrice { get; set; }

    [JsonPropertyName("market_cap")]
    [BsonElement("MarketCap")]
    [BsonRepresentation(BsonType.Int64)]
    public long MarketCap { get; set; }

    [BsonElement("MarketCapRank")]
    [JsonPropertyName("market_cap_rank")]
    public int MarketCapRank { get; set; }

    [JsonPropertyName("total_volume")]
    [BsonElement("TotalVolume")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal? TotalVolume { get; set; }

    [JsonPropertyName("price_change_percentage_24h")]
    [BsonElement("PriceChangePercentage24h")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal PriceChangePercentage24h { get; set; }

    [JsonPropertyName("last_updated")]
    [BsonElement("LastUpdated")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime LastUpdated { get; set; }

    [BsonElement("ingestion_date")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime IngestionDate { get; set; } = DateTime.UtcNow;

    [BsonElement("ohlc")]
    public List<OhlcData>? Ohlc { get; set; }
}

public class OhlcData
{
    [BsonElement("timestamp")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime Timestamp { get; set; }

    [BsonElement("open")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal? Open { get; set; }

    [BsonElement("high")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal? High { get; set; }

    [BsonElement("low")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal? Low { get; set; }

    [BsonElement("close")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal? Close { get; set; }
}
