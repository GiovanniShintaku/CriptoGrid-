namespace pmv_ads_2025_2_e4_CriptoGrid_t1.Models
{
    public class CriptoGridDatabase
    {
        public string ConnectionString { get; set; } = null!;
        public string DataBaseName { get; set; } = null!;
        public string CoinDataCollectionName { get; set; } = null!;
        public string UserAuthDataCollectionName { get; set; } = null!;
        public string UserCoinsDataCollectionName { get; set; } = null!;
    }
}
