using pmv_ads_2025_2_e4_CriptoGrid_t1.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Services
{
    public class LoginService
    {
        private readonly IMongoCollection<UserAuthData> _UserAuthDataCollection;
        public LoginService(
            IOptions<CriptoGridDatabaseSettings> CriptoGridDatabaseSettings)
        {
            var MongoClient = new MongoClient(
             CriptoGridDatabaseSettings.Value.ConnectionString
             );

            var MongoDataBase = MongoClient.GetDatabase(
                CriptoGridDatabaseSettings.Value.DataBaseName
                );

            _UserAuthDataCollection = MongoDataBase.GetCollection<UserAuthData>(
                CriptoGridDatabaseSettings.Value.UserAuthDataCollectionName );
        }

        public async Task<UserAuthData?> GetAsync(string id) => 
            await _UserAuthDataCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(UserAuthData newUserAuthData) => 
            await _UserAuthDataCollection.InsertOneAsync( newUserAuthData );

        public async Task DeleteAsync(string id) =>
            await _UserAuthDataCollection.DeleteOneAsync(x=> x.Id == id);
    }
}
