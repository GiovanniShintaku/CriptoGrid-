using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Models
{
    public class UserAuthData
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
