
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

Descreva aqui a metodologia de trabalho do grupo para atacar o problema. Definições sobre os ambiente de trabalho utilizados pela  equipe para desenvolver o projeto. Abrange a relação de ambientes utilizados, a estrutura para gestão do código fonte, além da definição do processo e ferramenta através dos quais a equipe se organiza (Gestão de Times).

## Relação de Ambientes de Trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito deverá ser apresentada em uma tabela que especifica que detalha Ambiente, Plataforma e Link de Acesso. 
Nota: Vide documento modelo do estudo de caso "Portal de Notícias" e defina também os ambientes e frameworks que serão utilizados no desenvolvimento de aplicações móveis.

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `dev`: versão de teste do software
- `dev(IDRequisito)-(NomeResponsavel)`: versão de desenvolvimento do software
  
Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `Backlog`: Lista do que há que ser feito 
- `Fazendo`: Uma funcionalidade/item que já está sendo feito
- `Revisão`: Uma funcionalidade/item que precisa ser revisada
- `Ajustar`: Uma funcionalidade/item que não passou na revisão e precisa ser ajustada
- `Entregue`: Uma nova funcionalidade/item que está pronta e foi integrada à solução

Ao decorrer do projeto todas as branchs serão baseadas da branch Dev, os integrantes do time vão criar uma branch nova com o nome dev seguido do id do requisito assumido e o nome de quem o assumiu, ao terminar o desenvolvimento da funcionalidade será feito o Merge na branch Dev original no caso de não haver conflitos, ao final da etapa quando tudo estiver testado, ajustado e pronto ocorrerá um merge da Dev para a main para ser feita a entrega.
> **Links Úteis**:
> - [Microfundamento: Gerência de Configuração](https://pucminas.instructure.com/courses/87878/)
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e Github](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
>  - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Gerenciamento de Projeto

### Divisão de Papéis

Apresente a divisão de papéis entre os membros do grupo.

Exemplificação: A equipe utiliza metodologias ágeis, tendo escolhido o Scrum como base para definição do processo de desenvolvimento. A equipe está organizada da seguinte maneira:
- Product Owner: Camilla M.;
- Scrum Master: Giovanni S.;
- Equipe de Desenvolvimento: Camilla M., André F., Giovanni S., Brunno N., Guilherme, Junio;
- Project manager: Camilla M., Giovanni S., Leoneardo V.;
- Quality Assurance: Camilla M., André F., Giovanni S., Brunno N., Guilherme, Junio;

### Processo

O grupo está fazendo uso do quadro Kanban do projeto para acompanhamento do progresso feito por cada membro, havendo também reuniões semanais a parte com duração aproximada de 40 minutos com os integrantes para resolução de qualquer impedimento.
 
> **Links Úteis**:
> - [Planejamento e Gestáo Ágil de Projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Sobre quadros de projeto](https://docs.github.com/pt/github/managing-your-work-on-github/about-project-boards)
> - [Como criar Backlogs no Github](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial Slack](https://slack.com/intl/en-br/)

### Ferramentas

As ferramentas empregadas no projeto são:

- Visual Studio (IDE).
- Teams
- Photoshop (_wireframing_)

O Visual Studio foi escolhido porque ele possui uma integração com o sistema de versão e é a convenção no que se refere a desenvolvimento de código. As ferramentas de comunicação utilizadas possuem integração semelhante, são as usadas oficialmente pelos canais da faculdade e por isso foram selecionadas. Por fim, para criar diagramas utilizamos o photoshop por melhor captar as necessidades da nossa solução.
 
> **Possíveis Ferramentas que auxiliarão no gerenciamento**: 
> - [Slack](https://slack.com/)
> - [Github](https://github.com/)
