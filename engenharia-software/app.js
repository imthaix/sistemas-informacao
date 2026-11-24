const D = STUDY_DATA;
const page = document.getElementById("page");
let current = "home",
  qIndex = 0,
  quizSet = [],
  score = 0,
  answered = false,
  cardIndex = 0,
  flipped = false;
let learned = JSON.parse(localStorage.getItem("learnedTopics") || "[]");
let qDone = Number(localStorage.getItem("quizDone") || 0);
const titleMap = {
  home: "Aprenda com clareza. Revise com estratégia.",
  content: "Resumos do conteúdo",
  diagrams: "Visualize os processos",
  quiz: "Teste seu conhecimento",
  cards: "Memorize com flashcards",
  rapid: "Revisão de alta velocidade",
};
function setPage(p) {
  current = p;
  document
    .querySelectorAll(".nav-item")
    .forEach((b) => b.classList.toggle("active", b.dataset.page === p));
  document.getElementById("pagetitle").textContent = titleMap[p];
  document.getElementById("search").value = "";
  render();
}
document.getElementById("nav").addEventListener("click", (e) => {
  let b = e.target.closest("[data-page]");
  if (b) setPage(b.dataset.page);
});
document.getElementById("themeBtn").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
};
if (localStorage.getItem("dark") === "true")
  document.body.classList.add("dark");
document.getElementById("resetBtn").onclick = () => {
  if (confirm("Apagar progresso e estatísticas deste navegador?")) {
    learned = [];
    qDone = 0;
    localStorage.clear();
    updateProgress();
    render();
  }
};
function updateProgress() {
  let pct = Math.round((learned.length / D.topics.length) * 100);
  document.getElementById("progressbar").style.width = pct + "%";
  document.getElementById("progresslabel").textContent =
    pct + "% dos tópicos marcados";
}
function render() {
  updateProgress();
  if (current === "home") home();
  if (current === "content") contentPage();
  if (current === "diagrams") diagramPage();
  if (current === "quiz") quizPage();
  if (current === "cards") cardsPage();
  if (current === "rapid") rapidPage();
}
function home() {
  page.innerHTML = `<div class="hero"><div><span class="pill">GUIA COMPLETO · ENGENHARIA I + II</span><h2>Estude para a prova.<br>Construa visão de engenharia.</h2><p>Resumo por tópicos, diagramas visuais, quiz com explicação e flashcards. O conteúdo principal foi organizado a partir dos arquivos que você enviou; complementos estão sinalizados.</p><button class="button" onclick="setPage('content')">Começar pelos resumos →</button></div><div class="hero-art">🧠📐</div></div><div class="grid"><div class="card"><div class="stat">${D.topics.length}</div><h3>Assuntos organizados</h3><p>Da introdução e requisitos à arquitetura e persistência.</p></div><div class="card"><div class="stat">${D.quiz.length}</div><h3>Questões de treino</h3><p>Responda e leia a justificativa para fixar conceitos.</p></div><div class="card"><div class="stat">${D.flashcards.length}</div><h3>Flashcards</h3><p>Treine recuperação ativa e memorize distinções.</p></div></div><h2 class="section-title">Trilha recomendada para poucos dias</h2><div class="grid">${[
    ["Dia 1", "Fundamentos, ciclo de vida e requisitos"],
    ["Dia 2", "Casos de uso, classes e relacionamentos"],
    ["Dia 3", "Sequência, atividades e estados"],
    ["Dia 4", "Camadas, arquitetura e mapeamento"],
    ["Última revisão", "Quiz + flashcards + revisão rápida"],
  ]
    .map(
      (x) =>
        `<div class="card"><span class="pill">${x[0]}</span><h3>${x[1]}</h3><p>Marque tópicos estudados na página de resumos.</p></div>`,
    )
    .join(
      "",
    )}</div><div class="card"><h3>Como usar com eficiência</h3><p>1. Leia um resumo e feche a página para explicar em voz alta. 2. Desenhe o diagrama de memória. 3. Faça questões sem consultar. 4. Revise erros e flashcards no dia seguinte.</p></div>`;
}
function contentPage() {
  page.innerHTML = `<p class="note">Abra cada tópico. Use “marcar como estudado” para acompanhar sua revisão.</p><div class="topic-list">${D.topics.map((t) => `<article class="topic" id="topic-${t.id}"><div class="topic-head" onclick="this.parentElement.classList.toggle('open')"><h3>${t.title}</h3><span class="pill">${t.tag}</span></div><div class="topic-body"><p>${t.summary}</p>${t.sections.map((s) => `<h4>${s.heading}</h4><p>${s.body}</p>`).join("")}<div class="quick"><strong>⚡ Resposta rápida de prova:</strong> ${t.quick}</div><button class="button" onclick="markTopic('${t.id}')">${learned.includes(t.id) ? "✓ Estudado — desmarcar" : "Marcar como estudado"}</button></div></article>`).join("")}</div>`;
}
function markTopic(id) {
  learned = learned.includes(id)
    ? learned.filter((x) => x !== id)
    : [...learned, id];
  localStorage.setItem("learnedTopics", JSON.stringify(learned));
  contentPage();
  updateProgress();
}
function diagramPage() {
  page.innerHTML = `<p class="note">Fluxos conceituais para desenhar de memória. Use-os como mapa, não como substituto da notação UML.</p><div class="diagram-grid">${D.flowcharts.map((f) => `<div class="diagram"><h3>${f.title}</h3><div class="steps">${f.steps.map((s, i) => `<div class="step">${s}</div>${i < f.steps.length - 1 ? '<div class="arrow">↓</div>' : ""}`).join("")}</div><p class="note">${f.note}</p></div>`).join("")}</div>`;
}
function startQuiz() {
  quizSet = [...D.quiz].sort(() => Math.random() - 0.5);
  qIndex = 0;
  score = 0;
  answered = false;
  quizPage();
}
function quizPage() {
  if (!quizSet.length) quizSet = [...D.quiz];
  if (qIndex >= quizSet.length) {
    page.innerHTML = `<div class="quiz-panel"><h2>Quiz concluído! 🎉</h2><p class="stat">${score} / ${quizSet.length}</p><p>Percentual: ${Math.round((score / quizSet.length) * 100)}%. ${score / quizSet.length >= 0.85 ? "Excelente! Reforce só os pontos em que errou." : score / quizSet.length >= 0.65 ? "Boa base. Revise os erros e tente novamente." : "Volte aos resumos e faça outra rodada."}</p><button class="button" onclick="startQuiz()">Nova rodada aleatória</button></div>`;
    qDone += quizSet.length;
    localStorage.setItem("quizDone", qDone);
    return;
  }
  let q = quizSet[qIndex];
  page.innerHTML = `<div class="quiz-panel"><div class="quiz-top"><span>Questão ${qIndex + 1} de ${quizSet.length}</span><span>Acertos nesta rodada: ${score}</span></div><div class="progress"><i style="width:${(qIndex / quizSet.length) * 100}%"></i></div><h2 class="quiz-question">${q.q}</h2><div class="options">${q.opts.map((o, i) => `<button class="option" onclick="answer(${i})">${String.fromCharCode(65 + i)}. ${o}</button>`).join("")}</div><div id="feedback"></div><button id="next" class="button" disabled onclick="nextQuestion()">${qIndex === quizSet.length - 1 ? "Finalizar" : "Próxima questão →"}</button></div>`;
}
function answer(i) {
  if (answered) return;
  answered = true;
  let q = quizSet[qIndex],
    opts = document.querySelectorAll(".option");
  opts[i].classList.add(i === q.a ? "correct" : "wrong");
  opts[q.a].classList.add("correct");
  if (i === q.a) score++;
  document.getElementById("feedback").innerHTML =
    `<div class="feedback"><strong>${i === q.a ? "Correto!" : "Não foi dessa vez."}</strong> ${q.why}</div>`;
  document.getElementById("next").disabled = false;
}
function nextQuestion() {
  qIndex++;
  answered = false;
  quizPage();
}
function cardsPage() {
  let f = D.flashcards[cardIndex];
  page.innerHTML = `<div class="quiz-top"><span>Flashcard ${cardIndex + 1} de ${D.flashcards.length}</span><span>Memória ativa</span></div><div class="flash-wrap"><div class="flashcard" onclick="flipCard()">${flipped ? `<div><span class="pill">RESPOSTA</span><p>${f[1]}</p></div>` : `<div><span class="pill">PERGUNTA</span><h2>${f[0]}</h2><p>Clique para revelar</p></div>`}</div></div><div class="flash-actions"><button class="ghost-btn" onclick="prevCard()">← Anterior</button><button class="button" onclick="flipCard()">Virar cartão</button><button class="ghost-btn" onclick="nextCard()">Próximo →</button></div><p class="note" style="text-align:center">Tente responder antes de revelar. Se errou, volte ao cartão mais tarde.</p>`;
}
function flipCard() {
  flipped = !flipped;
  cardsPage();
}
function nextCard() {
  cardIndex = (cardIndex + 1) % D.flashcards.length;
  flipped = false;
  cardsPage();
}
function prevCard() {
  cardIndex = (cardIndex - 1 + D.flashcards.length) % D.flashcards.length;
  flipped = false;
  cardsPage();
}
function rapidPage() {
  let list = [
    ["RF", "O sistema deve oferecer uma função."],
    ["RNF", "Qualidade, restrição, desempenho, segurança etc."],
    ["Elicitação", "Descobrir necessidades."],
    ["Análise", "Organizar, priorizar e negociar."],
    ["Especificação", "Documentar."],
    ["Validação", "Confirmar com stakeholders."],
    ["Include", "Obrigatório/reutilizado."],
    ["Extend", "Opcional/condicional."],
    ["Sequência", "Tempo vertical."],
    ["Comunicação", "Participantes + mensagens numeradas."],
    ["Decisão", "Escolhe caminho por guarda."],
    ["Merge", "Reúne caminhos alternativos."],
    ["Fork", "Paralelismo."],
    ["Join", "Sincronização."],
    ["Estado", "Condição de objeto."],
    ["Evento", "Gatilho de transição."],
    ["IU", "Interface e interação."],
    ["GT", "Orquestra caso de uso."],
    ["DP", "Entidades/regras do domínio."],
    ["GD/DAO", "Persistência e CRUD."],
    ["PK", "Identificador único."],
    ["FK", "Referência/integridade."],
    ["N:N", "Tabela associativa."],
    ["Verificação", "Conforme especificação?"],
    ["Validação", "Atende a necessidade?"],
    ["Unitário", "Unidade isolada."],
    ["Integração", "Interfaces entre módulos."],
    ["Sistema", "Sistema completo."],
    ["Aceitação", "Critérios do cliente/usuário."],
    ["Cascata", "Sequencial; requisitos estáveis."],
    ["Incremental", "Entrega partes funcionais."],
    ["Iterativo", "Refina repetidamente."],
    ["Espiral", "Risco guiando ciclos."],
  ];
  page.innerHTML = `<div class="card"><h2>Identifique a alternativa certa pelo termo</h2><p>Memorize estas pistas. Na prova, elimine alternativas que trocam o foco dos conceitos.</p></div><div class="rapid-grid">${list.map((x) => `<div class="rapid"><strong>${x[0]}</strong><br>${x[1]}</div>`).join("")}</div><h2 class="section-title">Mini-checklist antes de entrar</h2><div class="card">${["Consigo explicar RF e RNF e dar exemplos?", "Diferencio include, extend e generalização?", "Sei desenhar classe, multiplicidade, herança e composição?", "Sei diferenciar Sequência e Comunicação?", "Sei decisão/merge e fork/join?", "Sei estado, evento e transição?", "Sei IU, GT, DP, GD/DAO?", "Sei classe/tabela, atributo/coluna, PK/FK e N:N?", "Diferencio verificação, validação e níveis de teste?"].map((x) => `<label style="display:block;margin:12px 0"><input type="checkbox"> ${x}</label>`).join("")}</div>`;
}
document.getElementById("search").addEventListener("input", (e) => {
  let term = e.target.value.toLowerCase();
  if (!term) {
    render();
    return;
  }
  current = "content";
  document.getElementById("pagetitle").textContent = "Resultados da busca";
  document
    .querySelectorAll(".nav-item")
    .forEach((b) => b.classList.toggle("active", b.dataset.page === "content"));
  let hits = D.topics.filter((t) =>
    (
      t.title +
      " " +
      t.summary +
      " " +
      t.quick +
      " " +
      t.sections.map((s) => s.heading + " " + s.body).join(" ")
    )
      .toLowerCase()
      .includes(term),
  );
  page.innerHTML = hits.length
    ? `<div class="topic-list">${hits.map((t) => `<article class="topic open"><div class="topic-head"><h3>${t.title}</h3><span class="pill">${t.tag}</span></div><div class="topic-body"><p>${t.summary}</p>${t.sections.map((s) => `<h4>${s.heading}</h4><p>${s.body}</p>`).join("")}<div class="quick">${t.quick}</div></div></article>`).join("")}`
    : `<div class="card empty">Nenhum assunto encontrado. Tente palavras como “RNF”, “fork”, “DAO” ou “estado”.</div>`;
});
window.setPage = setPage;
window.markTopic = markTopic;
window.startQuiz = startQuiz;
window.answer = answer;
window.nextQuestion = nextQuestion;
window.flipCard = flipCard;
window.nextCard = nextCard;
window.prevCard = prevCard;
render();
