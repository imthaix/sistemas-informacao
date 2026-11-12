/* -------------------------------------------------------
   Estuda+ | Lógica da página
   Aqui ficam os tópicos, os cartões e as perguntas do quiz.
-------------------------------------------------------- */

// Conteúdo organizado a partir do resumo fornecido para a prova.
const topics = [
  {
    id: 1,
    title: "Projeto da interface",
    intro:
      "A interface funciona como um contrato: mostra como um componente pode ser utilizado sem expor sua implementação interna.",
    concepts: [
      [
        "Separação entre interface e implementação",
        "Quem utiliza o componente conhece métodos, parâmetros e retornos, mas não precisa conhecer o código interno.",
      ],
      [
        "Baixo acoplamento e alta coesão",
        "O baixo acoplamento reduz dependências entre módulos. A alta coesão mantém responsabilidades relacionadas no mesmo componente.",
      ],
      [
        "ISP — Segregação de Interfaces",
        "É melhor criar interfaces pequenas e específicas para cada cliente do que uma interface enorme e genérica.",
      ],
      [
        "Design by Contract",
        "Define pré-condições, pós-condições e invariantes que orientam o uso correto de uma interface.",
      ],
      [
        "Contract-first design",
        "O contrato, como WSDL ou OpenAPI, é definido antes da implementação para permitir trabalho paralelo.",
      ],
    ],
    tip: "Uma boa interface esconde a complexidade e permite trocar a implementação sem quebrar quem consome o componente.",
  },
  {
    id: 2,
    title: "MVC, MVP e MVVM",
    intro:
      "Os três padrões separam a lógica de negócio da lógica de apresentação. A diferença principal está na comunicação entre as partes.",
    concepts: [
      [
        "MVC",
        "O Controller intermedia o fluxo. A View pode acessar o Model, por isso o acoplamento pode ser maior.",
      ],
      [
        "MVP",
        "O Presenter chama explicitamente os métodos da View. A View é passiva e não fica acoplada ao Model.",
      ],
      [
        "MVVM",
        "O ViewModel não conhece a View. O data binding sincroniza os dados com a interface.",
      ],
      [
        "Como diferenciar",
        "MVC: Controller. MVP: Presenter. MVVM: ViewModel e data binding.",
      ],
    ],
    tip: "Na comparação, lembre-se de quem coordena a comunicação: Controller, Presenter ou data binding.",
  },
  {
    id: 3,
    title: "SOA e Web Services",
    intro:
      "SOA organiza funcionalidades como serviços independentes e reutilizáveis, comunicados por contratos bem definidos.",
    concepts: [
      [
        "Princípios da SOA",
        "Baixo acoplamento, reusabilidade, abstração, autonomia, statelessness e descoberta.",
      ],
      [
        "Papéis",
        "Service Provider disponibiliza; Service Consumer utiliza; Service Registry/Broker cataloga e ajuda a localizar.",
      ],
      [
        "SOAP",
        "Usa XML, contrato WSDL e é orientado a operações e mensagens. Pode utilizar diferentes protocolos.",
      ],
      [
        "REST",
        "É orientado a recursos identificados por URIs, utiliza HTTP e geralmente trabalha com JSON.",
      ],
      [
        "WSDL, UDDI e ESB",
        "WSDL descreve o serviço SOAP; UDDI registra e descobre serviços; ESB integra, roteia e transforma mensagens.",
      ],
      [
        "SOA x Microsserviços",
        "SOA costuma trabalhar com serviços mais abrangentes. Microsserviços são menores e favorecem deploy independente.",
      ],
    ],
    tip: "Não trate SOAP e REST como sinônimos, nem SOA e microsserviços como a mesma arquitetura.",
  },
  {
    id: 4,
    title: "Qualidade do Sistema",
    intro:
      "Qualidade envolve tanto as funções entregues quanto as características e restrições do comportamento do sistema.",
    concepts: [
      [
        "Requisitos funcionais (RF)",
        "Descrevem o que o sistema faz: funcionalidades concretas, como realizar um login.",
      ],
      [
        "Requisitos não funcionais (RNF)",
        "Descrevem como o sistema deve se comportar: desempenho, segurança, disponibilidade e usabilidade.",
      ],
      [
        "ISO/IEC 25010",
        "Apresenta oito características: adequação funcional, eficiência de desempenho, compatibilidade, usabilidade, confiabilidade, segurança, manutenibilidade e portabilidade.",
      ],
      [
        "Trade-offs",
        "Melhorar um atributo pode prejudicar outro. Mais criptografia e autenticação, por exemplo, podem aumentar o tempo de processamento.",
      ],
    ],
    tip: "Login é uma funcionalidade, portanto é RF. Segurança e desempenho são características de qualidade, portanto entram como RNF.",
  },
  {
    id: 5,
    title: "Integração e Comunicação",
    intro:
      "Sistemas podem trocar informações de formas diferentes. A escolha depende de fatores como segurança, desempenho e escalabilidade.",
    concepts: [
      [
        "Comunicação síncrona",
        "O cliente envia uma requisição e espera a resposta antes de continuar. Uma chamada REST tradicional é um exemplo.",
      ],
      [
        "Comunicação assíncrona",
        "O cliente envia a mensagem e continua o processamento. A resposta pode chegar depois, por callback, webhook ou fila.",
      ],
      [
        "Point-to-point",
        "Um sistema se comunica diretamente com outro sistema específico.",
      ],
      [
        "Publish/Subscribe",
        "Um produtor publica em um tópico e vários consumidores interessados recebem a mensagem.",
      ],
      [
        "API Gateway e ESB",
        "API Gateway é uma entrada que roteia e autentica chamadas. ESB é um barramento de integração corporativa.",
      ],
      [
        "Webhooks e gRPC",
        "Webhook avisa outro sistema quando um evento ocorre. gRPC, baseado em HTTP/2, pode ser eficiente na comunicação interna.",
      ],
    ],
    tip: "Assíncrono não significa pior: pode melhorar escalabilidade e resiliência, mas costuma trazer mais complexidade.",
  },
  {
    id: 6,
    title: "DevOps",
    intro:
      "DevOps aproxima desenvolvimento e operações, promovendo colaboração e responsabilidade compartilhada durante todo o ciclo.",
    concepts: [
      [
        "Ciclo contínuo",
        "O símbolo do infinito representa um ciclo que integra as etapas de desenvolvimento e operações.",
      ],
      ["Lado Dev", "Planejar, codificar, construir e testar."],
      ["Lado Ops", "Liberar, configurar ou implantar e monitorar."],
      [
        "Quebra de silos",
        "As equipes deixam de trabalhar isoladas e compartilham a responsabilidade pelo produto.",
      ],
      [
        "DevSecOps",
        "Inclui segurança de forma contínua e automatizada em todas as fases, seguindo a ideia de Shift Left.",
      ],
    ],
    tip: "DevOps não separa Dev e Ops: busca integrar as equipes continuamente. Segurança não deve ficar apenas para o final.",
  },
  {
    id: 7,
    title: "Práticas e ferramentas DevOps",
    intro:
      "As práticas DevOps combinam automação, infraestrutura gerenciada por código, containers, deploy e observabilidade.",
    concepts: [
      [
        "CI",
        "Integração contínua: integrações frequentes disparam build e testes automatizados.",
      ],
      [
        "CD",
        "Continuous Delivery prepara o código validado para produção. Continuous Deployment também pode implantá-lo automaticamente.",
      ],
      [
        "Terraform e Ansible",
        "Terraform provisiona recursos de infraestrutura. Ansible automatiza configurações e tarefas em servidores.",
      ],
      [
        "Docker e Kubernetes",
        "Docker empacota aplicação e dependências em containers. Kubernetes orquestra containers em produção.",
      ],
      [
        "Blue-Green e Canary",
        "Blue-Green alterna tráfego entre dois ambientes. Canary libera gradualmente para uma parte dos usuários.",
      ],
      [
        "Observabilidade",
        "Prometheus coleta métricas e Grafana apresenta essas métricas em dashboards.",
      ],
      [
        "GitOps",
        "Usa o Git como fonte única da verdade para o estado desejado da infraestrutura e das aplicações.",
      ],
    ],
    tip: "Não confunda as ferramentas: Docker empacota, Kubernetes orquestra, Prometheus coleta métricas e Grafana apresenta os dados.",
  },
];

// Cada cartão apresenta uma pergunta curta e uma resposta direta.
const flashcards = [
  [
    1,
    "O que é uma interface?",
    "É o contrato que define como usar um componente, sem expor sua implementação.",
  ],
  [
    1,
    "O que significa baixo acoplamento?",
    "Que os módulos dependem menos diretamente uns dos outros.",
  ],
  [
    1,
    "O que determina o ISP?",
    "Interfaces pequenas e específicas para as necessidades de cada cliente.",
  ],
  [
    1,
    "Quais são os elementos do Design by Contract?",
    "Pré-condições, pós-condições e invariantes.",
  ],
  [2, "Quem intermedia o fluxo no MVC?", "O Controller."],
  [
    2,
    "Quem comanda a View no MVP?",
    "O Presenter, chamando seus métodos explicitamente.",
  ],
  [
    2,
    "Como a View é atualizada no MVVM?",
    "Por meio do data binding entre View e ViewModel.",
  ],
  [
    3,
    "O que é SOA?",
    "Arquitetura que organiza funcionalidades em serviços independentes e reutilizáveis.",
  ],
  [
    3,
    "Quais são os três papéis da SOA?",
    "Service Provider, Service Consumer e Service Registry/Broker.",
  ],
  [3, "Qual formato o SOAP utiliza?", "XML."],
  [3, "Qual documento descreve um serviço SOAP?", "WSDL."],
  [3, "Para que serve o UDDI?", "Para publicar e descobrir Web Services."],
  [
    3,
    "O que é um ESB?",
    "Middleware que integra, roteia, transforma e orquestra mensagens.",
  ],
  [
    3,
    "Qual diferença central entre SOA e microsserviços?",
    "Microsserviços tendem a ser menores e ter deploy independente.",
  ],
  [
    4,
    "O que é um requisito funcional?",
    "Uma funcionalidade que o sistema deve realizar.",
  ],
  [
    4,
    "O que é um requisito não funcional?",
    "Uma qualidade ou restrição sobre o comportamento do sistema.",
  ],
  [
    4,
    "Quantas características de qualidade a ISO/IEC 25010 lista no resumo?",
    "Oito características.",
  ],
  [
    4,
    "O que é um trade-off de qualidade?",
    "Uma melhoria em um atributo que pode prejudicar outro.",
  ],
  [
    5,
    "O que caracteriza comunicação síncrona?",
    "O cliente espera a resposta antes de continuar.",
  ],
  [
    5,
    "O que caracteriza comunicação assíncrona?",
    "O cliente envia a mensagem e continua sem esperar a resposta imediata.",
  ],
  [
    5,
    "O que é Publish/Subscribe?",
    "Um produtor publica em um tópico e vários consumidores podem receber a mensagem.",
  ],
  [
    5,
    "Para que serve um API Gateway?",
    "É a entrada que pode rotear, autenticar e agregar chamadas a serviços.",
  ],
  [
    5,
    "O que é um webhook?",
    "Um aviso automático enviado quando determinado evento acontece.",
  ],
  [
    6,
    "Qual é a ideia central de DevOps?",
    "Integrar desenvolvimento e operações com colaboração e responsabilidade compartilhada.",
  ],
  [
    6,
    "Quais etapas aparecem no lado Dev?",
    "Planejar, codificar, construir e testar.",
  ],
  [
    6,
    "O que DevSecOps acrescenta?",
    "Segurança contínua e automatizada em todas as fases.",
  ],
  [
    7,
    "O que significa CI?",
    "Integração contínua, com build e testes automatizados a cada integração.",
  ],
  [
    7,
    "Qual diferença entre Delivery e Deployment?",
    "Delivery prepara para produção; Deployment também implanta automaticamente.",
  ],
  [
    7,
    "Para que serve Terraform?",
    "Provisionar recursos de infraestrutura por código.",
  ],
  [
    7,
    "Para que serve Ansible?",
    "Automatizar configuração e tarefas em servidores.",
  ],
  [
    7,
    "Qual é o papel do Docker?",
    "Empacotar a aplicação e suas dependências em containers.",
  ],
  [
    7,
    "Qual é o papel do Kubernetes?",
    "Orquestrar containers, réplicas, tráfego e escalonamento.",
  ],
  [7, "O que o Prometheus faz?", "Coleta métricas."],
  [7, "O que o Grafana faz?", "Apresenta dados e métricas em dashboards."],
  [
    7,
    "O que é GitOps?",
    "Prática que usa o Git como fonte única da verdade para o estado desejado.",
  ],
];

// Afirmações de verdadeiro ou falso. A explicação aparece após a resposta.
const questions = [
  {
    topic: 1,
    text: "Uma interface bem projetada permite trocar a implementação sem necessariamente quebrar quem utiliza o componente.",
    answer: true,
    explanation:
      "Verdadeiro. O consumidor depende do contrato da interface, não dos detalhes internos da implementação.",
  },
  {
    topic: 1,
    text: "O princípio ISP recomenda uma única interface grande para atender todos os clientes.",
    answer: false,
    explanation:
      "Falso. O ISP recomenda interfaces menores e específicas para as necessidades de cada cliente.",
  },
  {
    topic: 1,
    text: "No Design by Contract, invariantes são regras que devem permanecer verdadeiras.",
    answer: true,
    explanation:
      "Verdadeiro. O contrato reúne pré-condições, pós-condições e invariantes.",
  },
  {
    topic: 2,
    text: "No MVC, o Presenter é responsável por chamar os métodos da View.",
    answer: false,
    explanation:
      "Falso. Essa é a característica descrita para o MVP. No MVC, o Controller intermedia o fluxo.",
  },
  {
    topic: 2,
    text: "No MVVM, o ViewModel não precisa conhecer a View para que os dados sejam sincronizados.",
    answer: true,
    explanation:
      "Verdadeiro. O data binding realiza a sincronização entre a View e o ViewModel.",
  },
  {
    topic: 2,
    text: "No MVP, a View é passiva e o Presenter comanda a interação explicitamente.",
    answer: true,
    explanation:
      "Verdadeiro. O Presenter chama métodos da View, mantendo-a passiva.",
  },
  {
    topic: 3,
    text: "Na SOA, os serviços devem expor sua implementação interna para facilitar o consumo.",
    answer: false,
    explanation:
      "Falso. O consumidor conhece o contrato, não a lógica interna do serviço.",
  },
  {
    topic: 3,
    text: "Na SOA, o Service Provider disponibiliza o serviço e o Service Consumer o utiliza.",
    answer: true,
    explanation:
      "Verdadeiro. O Registry/Broker funciona como catálogo para publicar e localizar serviços.",
  },
  {
    topic: 3,
    text: "SOAP é geralmente associado ao formato JSON e ao contrato OpenAPI.",
    answer: false,
    explanation:
      "Falso. No resumo, SOAP utiliza XML e WSDL. REST geralmente utiliza JSON e pode ter OpenAPI.",
  },
  {
    topic: 3,
    text: "O ESB pode rotear e transformar mensagens entre serviços.",
    answer: true,
    explanation:
      "Verdadeiro. O ESB atua como middleware de integração em arquiteturas SOA.",
  },
  {
    topic: 3,
    text: "Microsserviços costumam ter granularidade menor e deploy independente em comparação com SOA tradicional.",
    answer: true,
    explanation:
      "Verdadeiro. Essa é uma das diferenças clássicas destacadas no material.",
  },
  {
    topic: 4,
    text: "Um sistema de login é classificado como requisito não funcional.",
    answer: false,
    explanation:
      "Falso. Login é uma funcionalidade concreta, portanto é um requisito funcional.",
  },
  {
    topic: 4,
    text: "A ISO/IEC 25010 apresenta oito características de qualidade de produto de software no resumo.",
    answer: true,
    explanation:
      "Verdadeiro. São elas: adequação funcional, eficiência, compatibilidade, usabilidade, confiabilidade, segurança, manutenibilidade e portabilidade.",
  },
  {
    topic: 4,
    text: "Confiabilidade e segurança são a mesma característica no modelo ISO/IEC 25010.",
    answer: false,
    explanation: "Falso. São características distintas no modelo.",
  },
  {
    topic: 4,
    text: "Aumentar camadas de segurança pode afetar o desempenho do sistema.",
    answer: true,
    explanation:
      "Verdadeiro. O material usa esse caso como exemplo de trade-off entre atributos.",
  },
  {
    topic: 5,
    text: "Na comunicação síncrona, o cliente espera a resposta antes de continuar.",
    answer: true,
    explanation:
      "Verdadeiro. Esse comportamento pode gerar gargalos quando o serviço demora.",
  },
  {
    topic: 5,
    text: "Na comunicação assíncrona, o cliente precisa ficar parado até receber a resposta.",
    answer: false,
    explanation:
      "Falso. O cliente pode continuar o processamento e receber a resposta depois.",
  },
  {
    topic: 5,
    text: "No modelo Publish/Subscribe, vários consumidores interessados podem receber mensagens de um tópico.",
    answer: true,
    explanation:
      "Verdadeiro. O produtor publica sem precisar conhecer diretamente cada consumidor.",
  },
  {
    topic: 5,
    text: "Um webhook é um mecanismo em que um sistema avisa outro automaticamente quando um evento acontece.",
    answer: true,
    explanation: "Verdadeiro. No resumo, o aviso ocorre por uma chamada HTTP.",
  },
  {
    topic: 5,
    text: "REST é sempre a melhor escolha, independentemente do cenário.",
    answer: false,
    explanation:
      "Falso. A escolha depende de segurança, desempenho e escalabilidade. gRPC pode ser mais eficiente em certos cenários.",
  },
  {
    topic: 6,
    text: "O ciclo DevOps busca integrar desenvolvimento e operações continuamente.",
    answer: true,
    explanation:
      "Verdadeiro. A proposta é romper silos e compartilhar responsabilidades.",
  },
  {
    topic: 6,
    text: "O lado Dev inclui planejar, codificar, construir e testar.",
    answer: true,
    explanation:
      "Verdadeiro. O lado Ops inclui liberar, configurar/implantar e monitorar.",
  },
  {
    topic: 6,
    text: "DevSecOps deixa a segurança apenas para a última etapa do projeto.",
    answer: false,
    explanation:
      "Falso. A segurança deve ser contínua e automatizada em todas as fases (Shift Left).",
  },
  {
    topic: 7,
    text: "Na CI, cada integração frequente pode disparar build e testes automatizados.",
    answer: true,
    explanation: "Verdadeiro. Essa é a ideia de Continuous Integration.",
  },
  {
    topic: 7,
    text: "Terraform é a ferramenta descrita no material para visualizar métricas em dashboards.",
    answer: false,
    explanation:
      "Falso. Grafana visualiza métricas. Terraform provisiona recursos de infraestrutura.",
  },
  {
    topic: 7,
    text: "Docker empacota aplicações e dependências em containers.",
    answer: true,
    explanation:
      "Verdadeiro. Kubernetes é a ferramenta de orquestração de containers.",
  },
  {
    topic: 7,
    text: "Blue-Green alterna o tráfego entre dois ambientes completos.",
    answer: true,
    explanation:
      "Verdadeiro. Já o Canary libera gradualmente para uma fração dos usuários.",
  },
  {
    topic: 7,
    text: "Prometheus coleta métricas e Grafana apresenta essas informações em dashboards.",
    answer: true,
    explanation:
      "Verdadeiro. As duas ferramentas ajudam na observabilidade e no monitoramento.",
  },
  {
    topic: 7,
    text: "No GitOps, o Git é usado como fonte única da verdade para o estado desejado.",
    answer: true,
    explanation:
      "Verdadeiro. Mudanças são feitas no repositório e ferramentas sincronizam o ambiente.",
  },
];

// Elementos da interface usados em mais de uma função.
const topicMenu = document.querySelector("#topicMenu");
const topicDetail = document.querySelector("#topicDetail");
const flashcardTopic = document.querySelector("#flashcardTopic");
const flashcardElement = document.querySelector("#flashcard");
const questionText = document.querySelector("#questionText");
const answerButtons = document.querySelector("#answerButtons");
const feedback = document.querySelector("#feedback");

let activeTopic = 1;
let activeCards = [...flashcards];
let cardIndex = 0;
let questionIndex = 0;
let roundCorrect = 0;
let answered = 0;
let correct = 0;
let questionLocked = false;

// Monta os botões de navegação dos sete assuntos.
function renderTopicMenu() {
  topicMenu.innerHTML = topics
    .map(
      (topic) => `
    <button class="topic-button ${topic.id === activeTopic ? "active" : ""}" data-topic="${topic.id}" type="button">
      <span>ASSUNTO 0${topic.id}</span>
      <strong>${topic.title}</strong>
    </button>
  `,
    )
    .join("");

  topicMenu.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTopic = Number(button.dataset.topic);
      renderTopicMenu();
      renderTopicDetail();
    });
  });
}

// Mostra o conteúdo do assunto selecionado.
function renderTopicDetail() {
  const topic = topics.find((item) => item.id === activeTopic);
  topicDetail.innerHTML = `
    <p class="eyebrow">ASSUNTO 0${topic.id} · REVISÃO</p>
    <h3>${topic.title}</h3>
    <p class="topic-intro">${topic.intro}</p>
    <div class="concept-list">
      ${topic.concepts
        .map(
          ([title, description]) => `
        <div class="concept"><strong>${title}</strong><p>${description}</p></div>
      `,
        )
        .join("")}
    </div>
    <p class="exam-tip"><strong>Para lembrar na prova:</strong> ${topic.tip}</p>
  `;
}

// Preenche o seletor de assunto dos flashcards.
function setupFlashcardTopics() {
  flashcardTopic.innerHTML =
    `<option value="all">Todos os assuntos</option>` +
    topics
      .map(
        (topic) =>
          `<option value="${topic.id}">Assunto ${topic.id} — ${topic.title}</option>`,
      )
      .join("");

  flashcardTopic.addEventListener("change", () => {
    const selected = flashcardTopic.value;
    activeCards =
      selected === "all"
        ? [...flashcards]
        : flashcards.filter((card) => String(card[0]) === selected);
    cardIndex = 0;
    showFlashcard();
  });
}

// Atualiza o cartão atual e garante que ele comece pelo lado da pergunta.
function showFlashcard() {
  const card = activeCards[cardIndex];
  flashcardElement.classList.remove("flipped");
  document.querySelector("#cardQuestion").textContent = card[1];
  document.querySelector("#cardAnswer").textContent = card[2];
  document.querySelector("#flashcardPosition").textContent =
    `Cartão ${cardIndex + 1} de ${activeCards.length}`;
  document.querySelector("#previousCard").disabled = cardIndex === 0;
  document.querySelector("#nextCard").disabled =
    cardIndex === activeCards.length - 1;
}

flashcardElement.addEventListener("click", () => {
  flashcardElement.classList.toggle("flipped");
});
document.querySelector("#previousCard").addEventListener("click", () => {
  if (cardIndex > 0) {
    cardIndex--;
    showFlashcard();
  }
});
document.querySelector("#nextCard").addEventListener("click", () => {
  if (cardIndex < activeCards.length - 1) {
    cardIndex++;
    showFlashcard();
  }
});

// Exibe a pergunta atual do quiz.
function showQuestion() {
  const question = questions[questionIndex];
  questionLocked = false;
  questionText.textContent = question.text;
  document.querySelector("#quizCategory").textContent = topics
    .find((topic) => topic.id === question.topic)
    .title.toUpperCase();
  document.querySelector("#questionPosition").textContent =
    `Questão ${questionIndex + 1} de ${questions.length}`;
  document.querySelector("#quizProgressBar").style.width =
    `${(questionIndex / questions.length) * 100}%`;
  document.querySelector("#quizScore").textContent =
    `Acertos nesta rodada: ${roundCorrect}`;
  feedback.hidden = true;
  feedback.className = "feedback";
  document.querySelector("#nextQuestion").disabled = true;
  document.querySelector("#nextQuestion").textContent =
    questionIndex === questions.length - 1
      ? "Ver resultado →"
      : "Próxima questão →";

  answerButtons.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });
}

// Confere a resposta e mostra a explicação.
function checkAnswer(value, clickedButton) {
  if (questionLocked) return;
  questionLocked = true;

  const question = questions[questionIndex];
  const isCorrect = value === question.answer;
  answered++;
  if (isCorrect) {
    correct++;
    roundCorrect++;
  }

  answerButtons.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
    if (String(question.answer) === button.dataset.answer)
      button.classList.add("correct");
  });
  if (!isCorrect) clickedButton.classList.add("wrong");

  feedback.hidden = false;
  feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  feedback.innerHTML = `<strong>${isCorrect ? "Muito bem!" : "Não foi dessa vez."}</strong> ${question.explanation}`;
  document.querySelector("#nextQuestion").disabled = false;
  document.querySelector("#quizScore").textContent =
    `Acertos nesta rodada: ${roundCorrect}`;
  updateProgress();
}

answerButtons.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () =>
    checkAnswer(button.dataset.answer === "true", button),
  );
});

// Avança para a próxima questão ou reinicia a rodada ao terminar.
document.querySelector("#nextQuestion").addEventListener("click", () => {
  if (!questionLocked) return;
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    showQuestion();
  } else {
    questionText.textContent = `Rodada concluída! Você acertou ${roundCorrect} de ${questions.length} questões.`;
    document.querySelector("#quizCategory").textContent = "RESULTADO";
    document.querySelector("#questionPosition").textContent = "Fim da rodada";
    document.querySelector("#quizProgressBar").style.width = "100%";
    answerButtons.innerHTML = `<button class="answer-button" id="restartQuiz" type="button">↻ Refazer o quiz</button>`;
    feedback.hidden = false;
    feedback.className = "feedback good";
    feedback.textContent =
      "Revise os assuntos em que teve dúvida e tente novamente.";
    document.querySelector("#nextQuestion").disabled = true;
    document.querySelector("#nextQuestion").textContent = "Rodada finalizada";
    document
      .querySelector("#restartQuiz")
      .addEventListener("click", restartQuiz);
  }
});

function restartQuiz() {
  questionIndex = 0;
  roundCorrect = 0;
  answerButtons.innerHTML = `
    <button class="answer-button" data-answer="true" type="button"><span>V</span> Verdadeiro</button>
    <button class="answer-button" data-answer="false" type="button"><span>F</span> Falso</button>
  `;
  answerButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () =>
      checkAnswer(button.dataset.answer === "true", button),
    );
  });
  showQuestion();
}

// Atualiza os números e a barra de desempenho.
function updateProgress() {
  document.querySelector("#answeredCount").textContent = answered;
  document.querySelector("#correctCount").textContent = correct;
  const percentage = answered ? Math.round((correct / answered) * 100) : 0;
  document.querySelector("#accuracy").textContent = `${percentage}%`;
  document.querySelector("#progressBar").style.width = `${percentage}%`;
}

// Zera os números acumulados e reinicia o quiz.
document.querySelector("#resetProgress").addEventListener("click", () => {
  answered = 0;
  correct = 0;
  updateProgress();
  restartQuiz();
});

// Menu compacto para telas menores.
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Inicializa os componentes quando o arquivo termina de carregar.
renderTopicMenu();
renderTopicDetail();
setupFlashcardTopics();
showFlashcard();
showQuestion();
updateProgress();
