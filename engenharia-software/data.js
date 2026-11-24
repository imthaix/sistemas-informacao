const STUDY_DATA = {
  topics: [
    {
      id: "intro",
      title: "1. Fundamentos da Engenharia de Software",
      tag: "Base",
      summary:
        "Engenharia de Software aplica princípios de engenharia à produção e manutenção de software: planejamento, requisitos, projeto, construção, testes, implantação e evolução. O foco é criar soluções confiáveis, úteis, sustentáveis e com qualidade — não apenas escrever código.",
      sections: [
        {
          heading: "Software e Engenharia de Software",
          body: "Software inclui programas, dados/configurações e documentação necessária para operar e manter o sistema. Engenharia de Software trata o processo inteiro e considera prazo, custo, qualidade, equipe, riscos e mudanças.",
        },
        {
          heading: "Qualidade",
          body: "A qualidade é construída durante o processo: requisitos claros, arquitetura apropriada, código compreensível, testes, revisão, documentação útil e manutenção. Um software pode funcionar hoje e ainda ser difícil de evoluir.",
        },
        {
          heading: "Processo, método, ferramenta e procedimento",
          body: "Processo = conjunto organizado de atividades. Método = como executar uma tarefa (técnicas, modelos, regras). Ferramenta = software que apoia/automatiza. Procedimento = sequência, entregáveis, controles e marcos que conectam métodos e ferramentas. CASE (Computer-Aided Software Engineering) integra ferramentas de apoio.",
        },
        {
          heading: "Papéis e visão profissional",
          body: "Engenheiro(a) de software não é apenas programador(a): entende problemas, conversa com stakeholders, modela, toma decisões técnicas, valida qualidade, gerencia riscos e comunica trade-offs.",
        },
      ],
      quick:
        "Se a pergunta diz ‘todos os aspectos da produção e manutenção’, pense Engenharia de Software. Processo = o que/etapas organizadas; método = como fazer; ferramenta = com o que apoiar; procedimento = sequência e controle.",
    },
    {
      id: "lifecycle",
      title: "2. Ciclo de vida e modelos de processo",
      tag: "Processos",
      summary:
        "Modelos de ciclo de vida organizam as atividades de desenvolvimento. Escolha depende de estabilidade dos requisitos, riscos, complexidade, feedback e necessidade de entregas frequentes.",
      sections: [
        {
          heading: "Etapas recorrentes",
          body: "Requisitos → análise → projeto → implementação → testes → implantação → operação/manutenção. Na prática há retorno, iteração e mudanças; não é necessariamente uma linha rígida.",
        },
        {
          heading: "Cascata",
          body: "Fases sequenciais, com entregas e passagem formal. Útil quando requisitos são estáveis e há forte necessidade de planejamento/documentação. Risco: mudanças tardias custam caro e usuário vê o produto mais tarde.",
        },
        {
          heading: "Prototipação",
          body: "Constrói uma versão simplificada para explorar requisitos, validar interface/ideias e obter feedback. Protótipo pode ser descartável ou evoluir; não confunda protótipo com produto pronto.",
        },
        {
          heading: "Incremental e iterativo",
          body: "Incremental entrega partes funcionais progressivamente; iterativo revisa e melhora versões. Podem ser combinados: cada ciclo entrega incremento e aprende com feedback.",
        },
        {
          heading: "Espiral",
          body: "Desenvolvimento em ciclos orientados a risco: definir objetivos, identificar/analisar riscos, desenvolver/verificar e planejar próximo ciclo. Adequado a projetos grandes ou incertos, mas exige análise de risco competente.",
        },
        {
          heading: "Ágil (visão complementar)",
          body: "Entrega frequente, colaboração, adaptação e feedback. Scrum organiza trabalho em Sprints, com Product Backlog, Sprint Planning, Daily, Review e Retrospective. Ágil não significa ausência de planejamento, documentação ou qualidade.",
        },
      ],
      quick:
        "Requisitos estáveis + etapas controladas = Cascata. Feedback para descobrir necessidades = Prototipação. Entregas em partes = Incremental. Refinar repetidamente = Iterativo. Risco é o centro = Espiral.",
    },
    {
      id: "requirements",
      title: "3. Engenharia de Requisitos",
      tag: "Muito cobrado",
      summary:
        "É o processo de descobrir, analisar, negociar, documentar e validar o que usuários e outras partes interessadas precisam, além das restrições do sistema.",
      sections: [
        {
          heading: "Elicitação (levantamento)",
          body: "Descobrir necessidades e contexto. Técnicas: entrevista, questionário, observação, workshop, análise documental, brainstorming e prototipação. Identifique fontes e stakeholders; não assuma que um único usuário representa todos.",
        },
        {
          heading: "Análise e negociação",
          body: "Organizar, priorizar, verificar conflitos, ambiguidades, viabilidade, dependências e riscos. Negociar uma versão acordada entre necessidades, orçamento, prazo e limitações.",
        },
        {
          heading: "Especificação",
          body: "Documentar requisitos de modo claro, consistente, rastreável e verificável. Pode usar linguagem natural estruturada, casos de uso, histórias, modelos e critérios de aceitação.",
        },
        {
          heading: "Validação",
          body: "Confirmar com stakeholders que os requisitos representam suas necessidades. Perguntas: correto? completo? consistente? viável? testável? Use revisão, walkthrough, protótipo e testes de aceitação.",
        },
        {
          heading: "Requisito funcional (RF)",
          body: "Descreve serviço, comportamento ou função que o sistema deve oferecer. Ex.: ‘O sistema deve permitir cadastrar um cliente’.",
        },
        {
          heading: "Requisito não funcional (RNF)",
          body: "Descreve qualidade, restrição ou condição: desempenho, segurança, usabilidade, disponibilidade, compatibilidade, legislação. Ex.: ‘95% das consultas devem responder em até 2 segundos’.",
        },
        {
          heading: "Regra de negócio e requisito",
          body: "Regra de negócio é uma política/condição do domínio (ex.: desconto máximo de 10%). Requisito pode especificar que o sistema implementará/validará essa regra. Não confundir com uma tela ou solução técnica.",
        },
      ],
      quick:
        "RF = o que o sistema faz. RNF = como deve funcionar/qual qualidade ou restrição. Elicitação = descobrir; análise = organizar/conflitos; especificação = documentar; validação = conferir se representa a necessidade.",
    },
    {
      id: "usecases",
      title: "4. Casos de Uso",
      tag: "UML",
      summary:
        "Modelam funcionalidades do ponto de vista de atores externos e objetivos que eles alcançam usando o sistema. São úteis para delimitar escopo e comunicar comportamento esperado.",
      sections: [
        {
          heading: "Elementos",
          body: "Ator (papel externo, humano ou sistema); caso de uso (objetivo/serviço); limite do sistema (retângulo); associação (participação/comunicação). Nomeie caso de uso com verbo + objetivo: ‘Registrar venda’.",
        },
        {
          heading: "Relacionamentos",
          body: "<<include>>: comportamento obrigatório e reutilizado, o caso base incorpora o incluído. <<extend>>: comportamento opcional/condicional que adiciona ao caso base em um ponto de extensão. Generalização: herança/especialização de atores ou casos de uso.",
        },
        {
          heading: "Descrição textual",
          body: "Inclua objetivo, ator principal, precondições, gatilho, fluxo principal, fluxos alternativos/exceções e pós-condições. O diagrama sozinho não detalha toda a sequência.",
        },
        {
          heading: "Dicas e erros",
          body: "Ator é papel, não necessariamente pessoa específica. Não coloque telas, botões ou passos internos como casos de uso. Casos de uso descrevem objetivos observáveis, não arquitetura.",
        },
      ],
      quick:
        "Include = obrigatório/reutilizado; Extend = opcional/condicional; ator fica fora do limite; casos de uso ficam dentro; nome = verbo + objetivo.",
    },
    {
      id: "classes",
      title: "5. Modelagem de Classes",
      tag: "UML / Estrutural",
      summary:
        "Diagrama de classes representa estrutura estática: classes, atributos, operações e relações. Na análise representa conceitos do domínio; no projeto acrescenta decisões técnicas e métodos.",
      sections: [
        {
          heading: "Classe e objeto",
          body: "Classe é uma descrição/modelo; objeto é uma instância concreta. Atributos representam dados/estado; operações (métodos) representam comportamento.",
        },
        {
          heading: "Visibilidade",
          body: "+ público; − privado; # protegido; ~ pacote (UML). Encapsulamento protege estado e oferece operações controladas.",
        },
        {
          heading: "Associação e multiplicidade",
          body: "Associação conecta classes. Multiplicidades comuns: 1, 0..1, 0..*, 1..*. Leia as extremidades: um Cliente pode ter zero ou muitas Vendas; cada Venda pertence a um Cliente (dependendo da regra).",
        },
        {
          heading: "Agregação e composição",
          body: "Agregação (losango vazio) indica relação todo-parte fraca; partes podem existir independentemente. Composição (losango preenchido) indica propriedade forte e ciclo de vida dependente do todo. Evite usar losangos sem significado claro.",
        },
        {
          heading: "Generalização",
          body: "Herança: classe especializada herda características da classe geral (triângulo vazio apontando para superclasse). Use quando existe relação ‘é um’; não apenas para reaproveitar código.",
        },
        {
          heading: "Classe de análise vs projeto",
          body: "Análise: conceitos do domínio e responsabilidades sem se prender à tecnologia. Projeto: estrutura implementável, interfaces, tipos, métodos, dependências, persistência e decisões arquiteturais.",
        },
      ],
      quick:
        "Classe = molde; objeto = instância. Atributo = dado; método = comportamento. Herança ‘é um’. Composição é parte dependente do todo. Multiplicidade mostra quantos objetos participam.",
    },
    {
      id: "interactions",
      title: "6. Diagramas de Interação: Sequência e Comunicação",
      tag: "UML / Dinâmico",
      summary:
        "Representam mensagens trocadas entre objetos/atores para executar um cenário. A sequência enfatiza ordem temporal; comunicação enfatiza vínculos e mensagens numeradas.",
      sections: [
        {
          heading: "Diagrama de Sequência",
          body: "Participantes no topo, linhas de vida verticais, mensagens horizontais, barras de ativação, retornos e criação/destruição quando aplicável. Tempo segue de cima para baixo. Modela um cenário específico, geralmente de um caso de uso.",
        },
        {
          heading: "Mensagens",
          body: "Mensagem representa chamada/solicitação entre participantes. Pode indicar operação que deve existir na classe receptora. Retorno pode ser mostrado com linha tracejada. Auto-mensagem é chamada do objeto para si.",
        },
        {
          heading: "Fragmentos combinados",
          body: "alt = caminhos alternativos (if/else); opt = trecho opcional; loop = repetição; par = concorrência. Guardas entre colchetes especificam condição.",
        },
        {
          heading: "Diagrama de Comunicação",
          body: "Mostra participantes e links (estrutura de comunicação) com mensagens numeradas para expressar ordem. Menos explícito temporalmente que sequência; útil para visualizar quem se comunica com quem.",
        },
        {
          heading: "Como derivar",
          body: "Parta do caso de uso e classes: identifique participantes, ordene mensagens, defina responsabilidades, operações e retornos; depois confira se classes e métodos envolvidos fazem sentido.",
        },
      ],
      quick:
        "Sequência = ordem/tempo vertical. Comunicação = rede de objetos + mensagens numeradas. alt = alternativa; opt = opcional; loop = repetição.",
    },
    {
      id: "activities",
      title: "7. Diagrama de Atividades",
      tag: "UML / Fluxo",
      summary:
        "Modela fluxo de trabalho, ações, decisões, caminhos alternativos e paralelismo. É semelhante a fluxograma, mas pode representar concorrência e sincronização.",
      sections: [
        {
          heading: "Elementos principais",
          body: "Nó inicial (círculo preenchido), ação/atividade (retângulo arredondado), fluxo (seta), nó final (círculo com contorno), decisão/merge (losango), fork/join (barra), condição de guarda [condição], raias (swimlanes) para responsabilidades.",
        },
        {
          heading: "Decisão vs Merge",
          body: "Decisão divide um fluxo em alternativas com guardas mutuamente exclusivas (ex.: [saldo suficiente] / [caso contrário]). Merge reúne caminhos alternativos; não sincroniza simultaneidade.",
        },
        {
          heading: "Fork vs Join",
          body: "Fork cria fluxos paralelos simultâneos. Join sincroniza e espera os fluxos paralelos necessários chegarem antes de continuar. Barra pode representar ambos; direção do fluxo determina o papel.",
        },
        {
          heading: "Raias",
          body: "Dividem atividades por responsável (cliente, sistema, caixa, serviço), ajudando a entender quem faz cada ação.",
        },
      ],
      quick:
        "Losango = decisão/merge. Barra = fork/join. Merge reúne alternativas; Join sincroniza paralelos. Guarda entre [ ].",
    },
    {
      id: "states",
      title: "8. Diagrama de Estados",
      tag: "UML / Dinâmico",
      summary:
        "Mostra estados possíveis de um objeto e transições provocadas por eventos, incluindo condições e ações. Foco no ciclo de vida de uma entidade.",
      sections: [
        {
          heading: "Estado, evento e transição",
          body: "Estado é condição/situação em que o objeto está. Evento é ocorrência que dispara mudança. Transição liga estado de origem a destino; pode ter guarda e ação.",
        },
        {
          heading: "Notação",
          body: "Estado inicial (ponto preenchido); estado (retângulo arredondado); transição (seta); final (círculo preenchido dentro de outro); guardas [condição]; efeito/ação após barra /.",
        },
        {
          heading: "Exemplo: pedido",
          body: "Criado → [pagamento aprovado] Pago → Separando → Enviado → Entregue. Criado → [pagamento recusado] Cancelado. Evento ‘cliente solicita cancelamento’ pode levar de estados permitidos a Cancelado conforme regras.",
        },
        {
          heading: "Quando usar",
          body: "Use quando estados e transições importam: pedido, venda, matrícula, sessão, pagamento, equipamento. Não é o melhor para mostrar sequência detalhada de tarefas; use atividade para workflow.",
        },
      ],
      quick:
        "Estados = condição do objeto; evento = gatilho; transição = mudança. Estados descrevem ciclo de vida, atividades descrevem fluxo de trabalho.",
    },
    {
      id: "architecture",
      title: "9. Projeto, Arquitetura e Camadas (Engenharia II)",
      tag: "Eng. Software II",
      summary:
        "Projeto transforma análise em solução implementável. Arquitetura define estrutura, componentes, responsabilidades, interfaces e decisões que afetam qualidade e evolução.",
      sections: [
        {
          heading: "Análise x projeto",
          body: "Análise responde ‘o que o domínio precisa?’; projeto responde ‘como será construído?’. Modelos de análise são mais conceituais; projeto detalha tecnologia, interfaces, métodos, persistência e infraestrutura.",
        },
        {
          heading: "Camadas de responsabilidade",
          body: "Separar responsabilidades reduz acoplamento e melhora manutenção. Uma organização comum: IU (interface), GT/Controller (coordena caso de uso), DP/Domínio (entidades e regras do domínio), GD/DAO (persistência e acesso a dados). A divisão exata depende do projeto.",
        },
        {
          heading: "IU",
          body: "Apresenta informação e recebe ações; validações superficiais de entrada podem existir, mas não deve concentrar regras críticas de negócio ou SQL.",
        },
        {
          heading: "GT / Controller",
          body: "Orquestra fluxo de caso de uso, recebe comandos da IU, aplica/coordena regras de cenário, chama serviços/DAOs, gerencia transações e devolve resultados/erros preparados.",
        },
        {
          heading: "DP / Domínio",
          body: "Classes que representam conceitos do problema e encapsulam estado e regras próprias. Deve evitar depender da interface ou detalhes de banco.",
        },
        {
          heading: "GD / DAO",
          body: "Responsável por persistência, consultas e CRUD. DAO abstrai acesso a dados para que o controller/domínio não precise espalhar SQL ou detalhes de banco.",
        },
        {
          heading: "Arquitetura física",
          body: "Descreve distribuição em hardware/ambientes/nós e comunicação: cliente, servidor de aplicação, banco, serviços, rede. Arquitetura lógica descreve componentes/camadas e suas responsabilidades.",
        },
      ],
      quick:
        "IU recebe/apresenta. GT coordena caso de uso. DP contém conceitos/regras. GD/DAO persiste/consulta. Física = onde executa; lógica = como componentes se organizam.",
    },
    {
      id: "mapping",
      title: "10. Mapeamento Objeto-Relacional e Banco",
      tag: "Eng. Software II",
      summary:
        "Relaciona classes persistentes do domínio a tabelas, atributos a colunas e associações a chaves/estruturas relacionais, mantendo consistência entre código e banco.",
      sections: [
        {
          heading: "Mapeamento básico",
          body: "Classe → tabela; atributo → coluna; identificador → PK; referência/associação → FK; relação muitos-para-muitos → tabela associativa com FKs (frequentemente PK composta).",
        },
        {
          heading: "Exemplo de venda",
          body: "Venda(idVenda PK, clienteId FK, data, valorTotal). ItemVenda(idVenda FK, produtoId FK, quantidade, preçoUnitário). A tabela ItemVenda conecta Venda e Produto; atributos quantidade/preço pertencem ao relacionamento/linha de item.",
        },
        {
          heading: "CRUD",
          body: "Create/Read/Update/Delete: inserir, consultar, atualizar, excluir. Não confunda CRUD com regras de negócio; uma venda pode exigir validações, transação, baixa de estoque e registro financeiro.",
        },
        {
          heading: "Integridade",
          body: "PK identifica unicamente; FK garante vínculo referencial; NOT NULL, UNIQUE, CHECK e tipos/restrições ajudam a validar. Transações garantem operações relacionadas como unidade lógica (commit/rollback).",
        },
        {
          heading: "DAO e transação",
          body: "DAO concentra operações de persistência. Transação deve proteger ações que precisam ocorrer juntas: finalizar venda e baixar estoque, por exemplo. Falha deve permitir rollback para não deixar dados inconsistentes.",
        },
      ],
      quick:
        "Classe→Tabela; atributo→coluna; PK→identifica; FK→referencia; N:N→tabela associativa. CRUD = criar, ler, atualizar, excluir.",
    },
    {
      id: "testing",
      title: "11. Qualidade, Testes, Manutenção e Extras",
      tag: "Conhecimento complementar",
      summary:
        "Esses tópicos complementam o conteúdo enviado e conectam modelagem com práticas de engenharia aplicáveis em projetos reais.",
      sections: [
        {
          heading: "Níveis de teste",
          body: "Unitário testa unidade isolada; integração testa comunicação entre módulos; sistema verifica o sistema completo; aceitação verifica se atende necessidade do usuário/critério acordado. Teste não prova ausência de defeitos.",
        },
        {
          heading: "Verificação x Validação",
          body: "Verificação: estamos construindo corretamente conforme especificação? Validação: estamos construindo o produto certo para a necessidade real?",
        },
        {
          heading: "Manutenção",
          body: "Correção (defeitos), adaptativa (ambiente), perfectiva (melhoria/novas necessidades), preventiva (reduzir problemas futuros/ melhorar estrutura).",
        },
        {
          heading: "Princípios de design",
          body: "Alta coesão: módulo tem responsabilidades relacionadas. Baixo acoplamento: dependências reduzidas. Encapsulamento: controlar acesso ao estado. SOLID é uma coleção de princípios de design OO, não uma etapa de ciclo de vida.",
        },
        {
          heading: "Git e documentação",
          body: "Controle de versão registra mudanças, permite colaboração e recuperação. Commits pequenos e descritivos; branches para trabalho isolado; pull request para revisão. Documentação deve explicar decisões, instalação, uso e contratos.",
        },
      ],
      quick:
        "Verificação = conformidade com especificação; validação = atende usuário. Unitário = unidade; integração = interfaces; sistema = conjunto; aceitação = cliente/critério.",
    },
  ],
  quiz: [
    {
      q: "Engenharia de Software se preocupa principalmente com…",
      opts: [
        "Somente escrever código",
        "Todos os aspectos da produção e manutenção de software",
        "Apenas desenhar interfaces",
        "Somente administrar banco de dados",
      ],
      a: 1,
      why: "A disciplina abrange processo, requisitos, projeto, construção, qualidade, implantação e manutenção.",
    },
    {
      q: "Qual é a diferença correta entre método e ferramenta?",
      opts: [
        "Método é software; ferramenta é regra",
        "Método orienta como executar; ferramenta apoia/automatiza",
        "São sinônimos",
        "Ferramenta é o ciclo de vida",
      ],
      a: 1,
      why: "Métodos incluem técnicas e orientações; ferramentas dão suporte automatizado.",
    },
    {
      q: "O modelo Cascata é mais apropriado quando…",
      opts: [
        "Os requisitos mudam diariamente",
        "Há necessidade de entregas contínuas sem planejamento",
        "Requisitos são relativamente estáveis e fases podem ser planejadas",
        "O projeto é totalmente desconhecido",
      ],
      a: 2,
      why: "Cascata organiza fases sequenciais e funciona melhor com requisitos estáveis; mudanças podem ser caras.",
    },
    {
      q: "O que caracteriza o modelo Espiral?",
      opts: [
        "Só testes no final",
        "Ciclos orientados à análise de riscos",
        "Entrega única e sequencial",
        "Proíbe protótipos",
      ],
      a: 1,
      why: "A análise de riscos é central em cada ciclo do modelo Espiral.",
    },
    {
      q: "Prototipação serve principalmente para…",
      opts: [
        "Substituir todos os testes",
        "Explorar/validar requisitos e obter feedback",
        "Garantir que não haverá mudanças",
        "Modelar exclusivamente o banco",
      ],
      a: 1,
      why: "Protótipos ajudam stakeholders a visualizar e esclarecer necessidades.",
    },
    {
      q: "Requisito funcional descreve…",
      opts: [
        "Uma qualidade de desempenho",
        "Uma restrição legal",
        "Uma função/serviço que o sistema oferece",
        "O orçamento da equipe",
      ],
      a: 2,
      why: "RF especifica comportamento ou serviço do sistema.",
    },
    {
      q: "‘A tela deve carregar em até 2 segundos’ é…",
      opts: ["RF", "RNF de desempenho", "Caso de uso", "Regra de herança"],
      a: 1,
      why: "Define uma qualidade/limite de desempenho.",
    },
    {
      q: "Qual etapa descobre e torna explícitas as necessidades?",
      opts: ["Validação", "Elicitação", "Implementação", "Deploy"],
      a: 1,
      why: "Elicitação coleta e descobre requisitos por técnicas como entrevistas e observação.",
    },
    {
      q: "Na validação de requisitos, o objetivo é…",
      opts: [
        "Escrever SQL",
        "Confirmar que os requisitos representam as necessidades",
        "Escolher linguagem",
        "Criar classes",
      ],
      a: 1,
      why: "Validação confirma adequação com stakeholders.",
    },
    {
      q: "No diagrama de casos de uso, o ator representa…",
      opts: [
        "Uma classe interna",
        "Uma pessoa específica obrigatoriamente",
        "Um papel externo que interage com o sistema",
        "Uma tabela",
      ],
      a: 2,
      why: "Ator é papel externo, podendo ser pessoa, sistema ou dispositivo.",
    },
    {
      q: "<<include>> significa…",
      opts: [
        "Comportamento opcional",
        "Comportamento obrigatório reutilizado/incluído",
        "Herança de classes",
        "Mensagem de retorno",
      ],
      a: 1,
      why: "O caso base incorpora o caso incluído, normalmente obrigatório.",
    },
    {
      q: "<<extend>> é usado para…",
      opts: [
        "Adicionar comportamento condicional/opcional",
        "Criar PK",
        "Definir ator principal",
        "Representar fluxo paralelo",
      ],
      a: 0,
      why: "Extensão acrescenta comportamento sob condição ou em ponto de extensão.",
    },
    {
      q: "Uma classe é…",
      opts: [
        "Instância concreta",
        "Modelo que descreve objetos",
        "Banco de dados",
        "Ator",
      ],
      a: 1,
      why: "Classe define estrutura e comportamento; objeto é uma instância.",
    },
    {
      q: "Atributos e métodos representam, respectivamente…",
      opts: [
        "Comportamento e dados",
        "Dados/estado e comportamento/operações",
        "Relacionamentos e eventos",
        "PK e FK",
      ],
      a: 1,
      why: "Atributos descrevem estado; métodos descrevem operações.",
    },
    {
      q: "Multiplicidade 0..* significa…",
      opts: ["Exatamente um", "Zero ou muitos", "Um ou muitos", "Zero ou um"],
      a: 1,
      why: "O intervalo indica mínimo zero e sem limite superior.",
    },
    {
      q: "Composição em UML indica…",
      opts: [
        "Todo-parte com dependência forte de ciclo de vida",
        "Uma simples herança",
        "Atores externos",
        "Uma mensagem",
      ],
      a: 0,
      why: "Composição é relação parte-todo forte; parte depende do todo.",
    },
    {
      q: "No diagrama de sequência, o tempo normalmente flui…",
      opts: [
        "Da esquerda para direita",
        "De baixo para cima",
        "De cima para baixo",
        "Sem direção",
      ],
      a: 2,
      why: "A ordem temporal é representada verticalmente.",
    },
    {
      q: "Diagrama de comunicação enfatiza…",
      opts: [
        "Estados do objeto",
        "Links entre participantes e mensagens numeradas",
        "Requisitos não funcionais",
        "Distribuição física",
      ],
      a: 1,
      why: "Comunicação mostra estrutura dos participantes e sequência numerada de mensagens.",
    },
    {
      q: "Fragmento alt representa…",
      opts: [
        "Repetição",
        "Alternativas condicionais",
        "Paralelismo",
        "Persistência",
      ],
      a: 1,
      why: "alt representa caminhos alternativos, geralmente com guardas.",
    },
    {
      q: "Em atividades, um losango com caminhos guardados representa…",
      opts: ["Fork", "Join", "Decisão", "Estado"],
      a: 2,
      why: "Decisão escolhe um caminho baseado em condições.",
    },
    {
      q: "Merge e Join diferem porque…",
      opts: [
        "Não diferem",
        "Merge reúne alternativas; Join sincroniza paralelos",
        "Join é decisão; Merge é ator",
        "Merge cria classes",
      ],
      a: 1,
      why: "Merge une caminhos alternativos; Join espera fluxos paralelos.",
    },
    {
      q: "Fork em diagrama de atividades…",
      opts: [
        "Cria fluxos simultâneos",
        "Finaliza objeto",
        "Define herança",
        "Cria tabela",
      ],
      a: 0,
      why: "Fork divide fluxo em execução paralela.",
    },
    {
      q: "Diagrama de estados enfatiza…",
      opts: [
        "Ordem de mensagens entre muitos objetos",
        "Ciclo de vida/condições de um objeto e eventos",
        "Organização física",
        "Requisitos funcionais",
      ],
      a: 1,
      why: "Modela estados e transições disparadas por eventos.",
    },
    {
      q: "Evento é…",
      opts: [
        "Um estado permanente",
        "Uma ocorrência que pode disparar transição",
        "Uma tabela",
        "Uma multiplicidade",
      ],
      a: 1,
      why: "Evento provoca mudança quando a transição aplicável é habilitada.",
    },
    {
      q: "Na arquitetura em camadas, a IU deve principalmente…",
      opts: [
        "Executar todo SQL",
        "Exibir dados e receber ações",
        "Concentrar todas regras de negócio",
        "Gerenciar as tabelas",
      ],
      a: 1,
      why: "Interface recebe interação e apresenta informação; lógica deve estar separada.",
    },
    {
      q: "GT/Controller tem como papel…",
      opts: [
        "Orquestrar o caso de uso e coordenar serviços",
        "Guardar toda informação em tabelas",
        "Renderizar CSS",
        "Substituir stakeholders",
      ],
      a: 0,
      why: "Controller coordena o fluxo, valida regras de cenário e aciona persistência.",
    },
    {
      q: "DAO é responsável principalmente por…",
      opts: [
        "Desenhar diagramas",
        "Abstrair operações de acesso/persistência de dados",
        "Validar UX",
        "Ser ator",
      ],
      a: 1,
      why: "DAO concentra consultas e operações de banco.",
    },
    {
      q: "No mapeamento objeto-relacional, uma classe persistente geralmente corresponde a…",
      opts: ["Um ator", "Uma tabela", "Um evento", "Um diagrama"],
      a: 1,
      why: "Classe mapeia para tabela; atributo para coluna.",
    },
    {
      q: "Uma FK serve para…",
      opts: [
        "Identificar unicamente qualquer linha sem PK",
        "Referenciar registro de outra tabela e manter vínculo",
        "Representar método",
        "Armazenar CSS",
      ],
      a: 1,
      why: "Foreign Key implementa referência e integridade relacional.",
    },
    {
      q: "Relacionamento muitos-para-muitos costuma ser implementado com…",
      opts: [
        "Somente uma coluna texto",
        "Tabela associativa com FKs",
        "Uma herança",
        "Uma classe abstrata obrigatória",
      ],
      a: 1,
      why: "Tabela intermediária representa cada associação, podendo incluir atributos do relacionamento.",
    },
    {
      q: "Verificação vs validação: qual está correta?",
      opts: [
        "Verificação: produto certo; validação: código certo",
        "Verificação: conformidade com especificação; validação: necessidade do usuário",
        "São iguais",
        "Validação só é teste unitário",
      ],
      a: 1,
      why: "Verificação avalia se construímos corretamente; validação se construímos o produto certo.",
    },
    {
      q: "Teste unitário avalia…",
      opts: [
        "Sistema inteiro com usuário",
        "Unidade isolada",
        "Somente banco em produção",
        "A aceitação do cliente",
      ],
      a: 1,
      why: "Unitário foca uma unidade pequena e isolada.",
    },
    {
      q: "Transação é especialmente importante quando…",
      opts: [
        "Uma ação envolve operações que devem ocorrer juntas",
        "Só alteramos cor",
        "Não há dados",
        "O sistema está offline",
      ],
      a: 0,
      why: "Commit/rollback protegem consistência em operações atômicas.",
    },
  ],
  flashcards: [
    [
      "RF vs RNF",
      "RF: serviço/comportamento. RNF: qualidade, restrição ou condição (desempenho, segurança, disponibilidade).",
    ],
    [
      "Elicitação",
      "Descobrir e coletar necessidades/contexto por entrevista, observação, questionário, workshop, documentos, protótipo.",
    ],
    [
      "Include vs Extend",
      "Include: obrigatório/reutilizado. Extend: opcional ou condicional no ponto de extensão.",
    ],
    [
      "Classe vs Objeto",
      "Classe é o modelo; objeto é uma instância concreta da classe.",
    ],
    [
      "Atributo vs Método",
      "Atributo guarda estado/dado; método define comportamento/operação.",
    ],
    [
      "Sequência vs Comunicação",
      "Sequência destaca ordem temporal vertical; comunicação destaca vínculos e mensagens numeradas.",
    ],
    [
      "Decisão vs Merge",
      "Decisão divide em caminhos alternativos; Merge reúne alternativas sem sincronizar.",
    ],
    ["Fork vs Join", "Fork inicia paralelismo; Join sincroniza/espera fluxos."],
    [
      "Estado vs Evento",
      "Estado é condição; evento é ocorrência que dispara transição.",
    ],
    [
      "Análise vs Projeto",
      "Análise descreve o problema/domínio e o que precisa; projeto define como implementar.",
    ],
    [
      "IU vs GT vs DP vs GD",
      "IU interage; GT orquestra; DP contém entidades/regras; GD/DAO persiste e consulta.",
    ],
    [
      "PK vs FK",
      "PK identifica unicamente; FK referencia outra tabela e sustenta integridade.",
    ],
    [
      "CRUD",
      "Create, Read, Update, Delete: criar, consultar, atualizar, excluir.",
    ],
    [
      "Verificação vs Validação",
      "Verificação: conformidade com especificação. Validação: atende necessidade real.",
    ],
    [
      "Cascata vs Incremental",
      "Cascata sequencial; incremental entrega funcionalidades em partes.",
    ],
    [
      "Iterativo vs Incremental",
      "Iterativo melhora/refina; incremental adiciona partes funcionais. Podem coexistir.",
    ],
    [
      "Composição vs Agregação",
      "Composição é vínculo parte-todo forte; agregação é fraca e partes podem existir separadamente.",
    ],
    [
      "Coesão vs Acoplamento",
      "Busque alta coesão (responsabilidade focada) e baixo acoplamento (poucas dependências).",
    ],
  ],
  flowcharts: [
    {
      title: "Engenharia de Requisitos",
      steps: [
        "Descobrir stakeholders e contexto",
        "Elicitar necessidades",
        "Analisar / priorizar / negociar",
        "Especificar e documentar",
        "Validar com stakeholders",
        "Gerenciar mudanças e rastreabilidade",
      ],
      note: "Ciclo: validação ou mudança pode levar de volta à elicitação/análise.",
    },
    {
      title: "Fluxo típico de desenvolvimento",
      steps: [
        "Requisitos",
        "Análise",
        "Projeto / Arquitetura",
        "Implementação",
        "Testes",
        "Implantação",
        "Operação e manutenção",
      ],
      note: "É um fluxo de referência; modelos iterativos repetem etapas e feedback.",
    },
    {
      title: "Caso de uso: finalizar venda",
      steps: [
        "Caixa inicia venda",
        "Controller cria contexto",
        "Adicionar itens e validar",
        "Calcular total",
        "Cliente paga",
        "[Pagamento aprovado?]",
        "Registrar venda + baixar estoque (transação)",
        "Emitir comprovante / concluir",
      ],
      note: "Se pagamento falhar, informar erro e não concluir/baixar estoque. Operações críticas devem ser consistentes.",
    },
    {
      title: "Arquitetura em camadas",
      steps: [
        "IU: recebe comando / mostra resposta",
        "GT: coordena caso de uso",
        "DP: regras e entidades",
        "GD/DAO: banco / CRUD",
        "Banco: persistência",
      ],
      note: "Resposta retorna pelas camadas. Evite IU com SQL ou regra centralizada.",
    },
    {
      title: "Mapeamento OO → Relacional",
      steps: [
        "Classe persistente",
        "Tabela",
        "Atributos → colunas",
        "ID → PK",
        "Referência → FK",
        "N:N → tabela associativa",
      ],
      note: "Confira tipos, restrições, multiplicidades e atributos que pertencem ao relacionamento.",
    },
    {
      title: "Escolha do modelo de processo",
      steps: [
        "Requisitos estáveis?",
        "Sim → Cascata pode ser adequado",
        "Não / feedback frequente?",
        "Prototipação ou iterativo/ágil",
        "Entregas por partes? → Incremental",
        "Risco alto/incerteza? → Espiral",
      ],
      note: "Não há modelo universalmente melhor: escolha considerando contexto, riscos, equipe e cliente.",
    },
  ],
};
