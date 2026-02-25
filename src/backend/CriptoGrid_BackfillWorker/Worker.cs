using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using CriptoGrid_BackfillWorker.Services;

namespace CriptoGrid_BackfillWorker.Runner
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly BackfillService _backfillService;

        public Worker(ILogger<Worker> logger, BackfillService backfillService)
        {
            _logger = logger;
            _backfillService = backfillService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Iniciando CriptoGrid BackfillWorker - atualização de dados faltantes e últimos 90 dias");

            try
            {
                await _backfillService.RunAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro durante a execução do BackfillWorker");
            }

            _logger.LogInformation("BackfillWorker concluído");
        }
    }
}