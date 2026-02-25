# Apresentação do Projeto — CriptoGrid  

# 1. Objetivos

- Criar uma solução completa para busca, histórico e visualização de dados de criptomoedas.  
- Entregar **três camadas integradas**:  
  - Backend em .NET 9  
  - Web App em React (Vite)  
  - Mobile App em React Native (Expo)  
- Utilizar uma arquitetura simples, porém moderna, focada em extensibilidade.

---

# 2. Visão Arquitetural do Sistema
Mesmo sendo um sistema enxuto, ele segue princípios profissionais:

### Arquitetura em três camadas bem definidas  
1. **Backend (API REST)**  
   - Fornece endpoints para listagem, detalhes e histórico.  
   - Usa MongoDB como única base de dados.  
   - Hospedado no SmarterASP.NET.

2. **Frontend Web (React + Vite)**  
   - Interface rápida, com carregamento instantâneo.  
   - Pesquisas, filtros e telas leves.  

3. **App Mobile (React Native + Expo)**  
   - Mantém a mesma estrutura conceitual da web.  
   - Experiência fluida em dispositivos físicos.

---

# 3. Princípios Técnicos que Guiaram o Desenvolvimento
Estes pontos não aparecem só "vendo a tela", mas são essenciais:

### **Simplicidade com Escalabilidade**
O projeto evita complexidade desnecessária, mas mantém portas abertas para expansão futura:
- MongoDB permite expandir coleções facilmente  
- A API é modular e simples de extender  
- O frontend permite novos componentes e páginas sem quebra

### **Reutilização de Lógica entre Web e Mobile**
- Hooks, serviços e chamadas HTTP compartilham a mesma estrutura mental  
- Facilita manutenção e reduz duplicação

### **Integração Limpa com MongoDB**
- As coleções foram modeladas para suportar histórico sem retrabalho  
- Consultas rápidas sem necessidade de joins ou estruturas complexas  

### **Responsividade e UX como prioridades**
- Web e mobile compartilham a mesma identidade visual  
- Busca rápida, leitura clara, telas minimalistas  

---

# 4. Fluxo de Funcionamento do Sistema

1. Usuário busca uma criptomoeda  
2. A API retorna dados atualizados do MongoDB  
3. O frontend exibe:  
   - Nome e preço  
   - Histórico 
   - Métricas Adicionais 
4. O mesmo fluxo funciona no mobile via Expo

---
