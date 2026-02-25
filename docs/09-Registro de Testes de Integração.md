## 🔰 Relatório de Testes de integração – Backend CriptoGrid

### Ambiente de Testes
- **Framework:** .NET 8.0  
- **Biblioteca de testes:** xUnit  
- **Ferramentas auxiliares:** Moq, MongoDB.Driver, Microsoft.Extensions.Options  
- **Projeto de Testes:** `CriptoGrid.IntegrationTest`  
- **Projeto Principal:** `pmv-ads-2025-2-e4-CriptoGrid-t1`

---

### Escopo dos Testes
Os testes de integração foram aplicados sobre toda a solução com enfase nas classes `PublicDataService`, `PublicDataController` e `CoinData` responsável pela manipulação e consulta de dados públicos das criptomoedas no banco MongoDB.

---

### Resultados da Execução

pmv-ads-2025-2-e4-CriptoGrid-t1 êxito(s) com 3 aviso(s) (8,3s) → pmv-ads-2025-2-e4-CriptoGrid-t1\bin\Debug\net8.0\pmv-ads-2025-2-e4-CriptoGrid-t1.dll
C:\Users\T-Gamer\Documents\GitHub\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\Models\UserAuthData.cs(12,23): warning CS8618: 0 propriedade não anulável 'Email' precisa conter um valor não nulo ao sair do constru
tor. Considere adicionar o modificador "obrigatório" ou declarar o propriedade como anulável.
C:\Users\T-Gamer\Documents\GitHub\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\Models\UserAuthData.cs(13,23): warning CS8618: 0 propriedade não anulável 'Password' precisa conter um valor não nulo ao sair do cons
trutor. Considere adicionar o modificador "obrigatório" ou declarar o propriedade como anulável.
C:\Users\T-Gamer\Documents\GitHub\pmv-ads-2025-2-e4-infra-t1-pmv-ads-2025-2-e4-infra-t1\src\backend\pmv-ads-2025-2-e4-CriptoGrid-t1\Models\UserAuthData.cs(14,23): warning CS8618: 0 propriedade não anulável 'Name' precisa conter um valor não nulo ao sair do construt
or. Considere adicionar o modificador "obrigatório" ou declarar o propriedade como anulável.
CoinGrid Teste êxito (1,6s) → CoinGrid Teste\bin\Debug\net8.0\CoinGrid Teste.dll
CriptoGrid.Integration Tests êxito (4,0s) → CriptoGrid.IntegrationTests\bin\Debug\net9.0\CriptoGrid.IntegrationTests.dll
[xUnit.net 00:00:00.00] xUnit.net VSTest Adapter v2.8.2+699d445a1a (64-bit .NET 9.0.4)
[xUnit.net 00:00:00.00] xUnit.net VSTest Adapter v3.1.5+1b188a7b0a (64-bit .NET 8.0.15)
[xUnit.net 00:00:00.58] Discovering: CoinGrid Teste
[xUnit.net 00:00:00.67]
Discovered: CoinGrid Teste
[xUnit.net 00:00:00.70] Starting: CoinGrid Teste
[xUnit.net 00:00:00.95]
[xUnit.net 00:00:01.02]
[xUnit.net 00:00:01.02]
Discovering: CriptoGrid.IntegrationTests
Discovered: CriptoGrid.IntegrationTests
Starting: CriptoGrid.IntegrationTests
[xUnit.net 00:00:03.29] Finished:

Resumo do teste: total: 5; falhou: 0; bem-sucedido: 5; ignorado: 0; duração: 13,0s
Construir êxito(s) com 3 aviso(s) em 26,4s
       
