using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Models
{
    public class UserCoinsData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } 
        public string? UserId { get; set; }
        public string? CoinId { get; set; }
    }
}
