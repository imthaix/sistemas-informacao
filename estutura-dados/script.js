/* =========================================================
   Guia de Estudos — Estrutura de Dados
   Flashcards e Verdadeiro/Falso
   ========================================================= */

/* ---------------------------------------------------------
   DADOS
   --------------------------------------------------------- */

// flashcards: t = termo (frente), d = definição (verso)
const F = [
  {
    t: "Pilha (Stack)",
    d: "Estrutura LIFO: o último a entrar é o primeiro a sair. Só se acessa pelo topo.",
  },
  {
    t: "push / pop / peek",
    d: "push insere no topo, pop remove e devolve o topo, peek só consulta o topo sem remover.",
  },
  {
    t: "Pilha sequencial × encadeada",
    d: "Sequencial usa vetor, com tamanho fixo (pode estourar). Encadeada usa nós alocados dinamicamente e cresce livremente.",
  },
  {
    t: "Aplicações de pilha",
    d: 'Botão "Voltar" do navegador, desfazer (Ctrl+Z) e pilha de chamadas de função.',
  },
  {
    t: "Fila (Queue)",
    d: "Estrutura FIFO: o primeiro a entrar é o primeiro a sair. Insere no fim (rear), remove no início (front).",
  },
  {
    t: "enqueue / dequeue",
    d: "enqueue insere no final da fila. dequeue remove e devolve o item do início.",
  },
  {
    t: "Fila de prioridade",
    d: "Usa heap e remove pelo critério de prioridade. Não é FIFO global.",
  },
  {
    t: "Fila circular",
    d: "Usa vetor fixo e reaproveita o espaço livre. Capacidade limitada.",
  },
  {
    t: "Custo do pop(0) em Python",
    d: "Desloca todos os elementos da lista uma posição, então a fila simples com lista custa O(n) no dequeue.",
  },
  {
    t: "Lista encadeada",
    d: "Conjunto de nodos, cada um com um dado e uma referência ao próximo (ou anterior). O último aponta para None.",
  },
  {
    t: "Método insere()",
    d: "O nome não garante onde insere: pode ser no início ou no fim. Sempre leia o código da implementação.",
  },
  {
    t: "Árvore binária",
    d: "Estrutura hierárquica em que cada nodo tem no máximo 2 filhos: esquerdo e direito.",
  },
  {
    t: "Raiz, folha, grau, altura",
    d: "Raiz: primeiro nodo, sem pai. Folha: nodo sem filhos. Grau: número de filhos. Altura: distância máxima da raiz ao nodo mais profundo.",
  },
  {
    t: "BST (árvore de busca)",
    d: "Esquerda sempre menor que o pai, direita sempre maior, sem valores repetidos.",
  },
  {
    t: "Árvore AVL",
    d: "BST auto-balanceada. Fator = nível da esquerda − nível da direita, sempre entre −1, 0 e +1. Fora disso, faz rotações.",
  },
  {
    t: "Por que a BST degenera?",
    d: "Com dados já ordenados (1, 2, 3, 4...) ela vira uma linha reta, como uma lista, e a busca passa a ser O(n).",
  },
  {
    t: "Pré-ordem (NLR)",
    d: "Raiz → Esquerda → Direita. Visita o nodo antes dos filhos.",
  },
  {
    t: "Em-ordem (LNR)",
    d: "Esquerda → Raiz → Direita. Numa BST devolve os valores em ordem crescente.",
  },
  {
    t: "Pós-ordem (LRN)",
    d: "Esquerda → Direita → Raiz. A raiz é visitada só depois dos filhos.",
  },
  {
    t: "Por nível (BFS)",
    d: "Percorre a árvore em largura, nível por nível, da esquerda para a direita.",
  },
  {
    t: "Busca sequencial",
    d: "Percorre elemento por elemento até achar. Funciona em qualquer estrutura, sem ordenação, mas é lenta em grandes volumes.",
  },
  {
    t: "Busca binária",
    d: "Divide para conquistar: descarta metade a cada passo. Exige lista ordenada.",
  },
  {
    t: "Tabela hash",
    d: "Associa chaves a valores usando uma função hash que calcula o índice. Busca idealmente O(1).",
  },
  {
    t: "Colisão (hash)",
    d: "Duas chaves diferentes geram o mesmo índice. Solução comum: encadeamento separado, com uma lista de pares (chave, valor) em cada posição.",
  },
  {
    t: "Bubble Sort",
    d: 'Compara pares adjacentes e troca se estiverem fora de ordem. O maior "borbulha" até o fim. O(n²).',
  },
  {
    t: "Insertion Sort",
    d: "Mantém uma parte ordenada e insere cada novo elemento na posição certa dela. O(n²) médio, O(n) no melhor caso.",
  },
  {
    t: "Selection Sort",
    d: "Procura o menor (ou maior) da parte não ordenada e faz apenas uma troca por iteração. O(n²).",
  },
  {
    t: "Quick Sort",
    d: "Escolhe um pivô e particiona: menores à esquerda, maiores à direita. Repete recursivamente. O(n log n) médio.",
  },
  {
    t: "Merge Sort",
    d: "Divide a sequência em partes menores, ordena cada uma e combina (merge) no final. O(n log n).",
  },
];

// verdadeiro ou falso: s = afirmação, a = resposta certa, e = explicação
const V = [
  {
    s: "Em uma pilha, o primeiro elemento inserido é o primeiro a sair.",
    a: false,
    e: "Isso é FIFO. A pilha é LIFO: o último a entrar é o primeiro a sair.",
  },
  {
    s: "Em Python, usar append() e pop() numa lista faz o final da lista funcionar como o topo da pilha.",
    a: true,
    e: "Os dois operam no final da lista.",
  },
  {
    s: "Uma fila encadeada pode se comportar como FIFO ou LIFO, dependendo da implementação.",
    a: false,
    e: "Fila é sempre FIFO. A implementação só muda como os dados ficam na memória.",
  },
  {
    s: "A fila de prioridade é FIFO global.",
    a: false,
    e: "Ela remove por prioridade, então não segue a ordem de chegada.",
  },
  {
    s: "Na fila implementada com lista Python, pop(0) tem custo O(1).",
    a: false,
    e: "pop(0) desloca todos os elementos, então o custo é O(n).",
  },
  {
    s: "Um método chamado insere() sempre insere no início da lista.",
    a: false,
    e: "Pode ser no início ou no fim. É preciso ler o código.",
  },
  {
    s: "Em uma árvore binária, cada nodo tem no máximo 2 filhos.",
    a: true,
    e: "Um à esquerda e outro à direita.",
  },
  {
    s: "A raiz de uma árvore tem um nodo pai.",
    a: false,
    e: "A raiz é o nível 0 e não tem pai.",
  },
  {
    s: "Em uma BST, o percurso em-ordem devolve os valores em ordem crescente.",
    a: true,
    e: "Esquerda (menores) → raiz → direita (maiores).",
  },
  {
    s: "Uma BST aceita valores repetidos.",
    a: false,
    e: "Valores repetidos não são permitidos.",
  },
  {
    s: "Inserir dados já ordenados numa BST comum pode transformá-la numa lista.",
    a: true,
    e: "Ela degenera numa linha reta. A AVL resolve isso com rotações.",
  },
  {
    s: "Numa árvore AVL, o fator de balanceamento de um nodo pode ser 2.",
    a: false,
    e: "Deve ficar entre −1, 0 e +1. Fora disso, é preciso rotacionar.",
  },
  {
    s: "Na pós-ordem, a raiz é a primeira a ser visitada.",
    a: false,
    e: "Na pós-ordem a raiz é a última (esquerda → direita → raiz).",
  },
  {
    s: "A busca binária exige que a lista esteja ordenada.",
    a: true,
    e: "Sem ordenação, descartar metade a cada passo não funciona.",
  },
  {
    s: "Buscando 18 em [11, 10, 2, 19, 18, 0, 8, 14, 20, 7] com busca sequencial, são necessárias 5 comparações.",
    a: true,
    e: "Índices 0 a 4: os quatro primeiros não batem e o quinto é o 18.",
  },
  {
    s: "Inserir numa tabela hash uma chave que já existe cria um elemento duplicado.",
    a: false,
    e: "O valor existente é atualizado (substituído).",
  },
  {
    s: "Colisão em hash é quando duas chaves diferentes geram o mesmo índice.",
    a: true,
    e: "Costuma ser resolvida com listas encadeadas em cada posição.",
  },
  {
    s: "O Bubble Sort compara elementos adjacentes e os troca se estiverem fora de ordem.",
    a: true,
    e: "Comparação de vizinhos + troca identifica o Bubble Sort.",
  },
  {
    s: "O Selection Sort faz várias trocas a cada iteração.",
    a: false,
    e: "Faz apenas uma troca por iteração.",
  },
  {
    s: "O Merge Sort usa a estratégia de dividir para conquistar.",
    a: true,
    e: "Divide, ordena as partes e combina (merge).",
  },
];

/* ---------------------------------------------------------
   AUXILIAR: localStorage com try/catch
   (em modo anônimo ou com storage bloqueado ele lança erro)
   --------------------------------------------------------- */
const store = {
  get(k, d) {
    try {
      const v = localStorage.getItem("ed_" + k);
      return v ? JSON.parse(v) : d;
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem("ed_" + k, JSON.stringify(v));
    } catch (e) {}
  },
};
const $ = (id) => document.getElementById(id);

/* ---------------------------------------------------------
   FLASHCARDS
   --------------------------------------------------------- */
const known = store.get("known", {}); // { indice: true (já sei) | false (revisar) }
let mode = "all",
  deck = [],
  idx = 0; // filtro atual, cartões visíveis, posição
const fc = $("fc");

// monta o baralho conforme o filtro e volta pro primeiro cartão
function buildDeck() {
  deck = F.map((c, i) => ({ ...c, i })).filter(
    (c) => mode === "all" || known[c.i] === false,
  );
  idx = 0;
  showCard();
}

function showCard() {
  fc.classList.remove("flip"); // sempre começa pela frente

  const y = Object.values(known).filter((x) => x === true).length;
  const n = Object.values(known).filter((x) => x === false).length;
  $("fcStat").textContent = `${y} já sei · ${n} revisar`;

  // baralho vazio (ex.: filtro "revisar" sem nada marcado)
  if (!deck.length) {
    $("fcCount").textContent = "";
    $("fcTerm").textContent = "Nenhum cartão aqui";
    $("fcDef").textContent = "";
    return;
  }
  const c = deck[idx];
  $("fcCount").textContent = `${idx + 1} / ${deck.length}`;
  $("fcTerm").textContent = c.t;
  $("fcDef").textContent = c.d;
}

// próximo / anterior dão a volta no baralho
const next = () => {
  if (deck.length) {
    idx = (idx + 1) % deck.length;
    showCard();
  }
};
const prev = () => {
  if (deck.length) {
    idx = (idx - 1 + deck.length) % deck.length;
    showCard();
  }
};

// marca "já sei" (true) ou "revisar" (false). No filtro "só revisar",
// o cartão marcado como sabido sai do baralho na hora
function judge(v) {
  if (!deck.length) return;
  known[deck[idx].i] = v;
  store.set("known", known);
  if (mode === "review" && v) {
    deck.splice(idx, 1);
    if (idx >= deck.length) idx = 0;
    showCard();
  } else next();
}

fc.addEventListener("click", () => fc.classList.toggle("flip"));
$("fcNext").onclick = next;
$("fcPrev").onclick = prev;
$("fcYes").onclick = () => judge(true);
$("fcNo").onclick = () => judge(false);

// embaralhar (Fisher-Yates)
$("fcShuffle").onclick = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  idx = 0;
  showCard();
};

// chips de filtro
function setMode(m) {
  mode = m;
  $("fcAll").setAttribute("aria-pressed", m === "all");
  $("fcRev").setAttribute("aria-pressed", m === "review");
  buildDeck();
}
$("fcAll").onclick = () => setMode("all");
$("fcRev").onclick = () => setMode("review");

buildDeck();

/* ---------------------------------------------------------
   VERDADEIRO OU FALSO
   --------------------------------------------------------- */
let answers = store.get("vf", {}); // { indice: true/false (o que a pessoa marcou) }

// placar no topo
function vfScore() {
  const done = Object.keys(answers).length;
  const ok = Object.entries(answers).filter(([i, r]) => r === V[i].a).length;
  $("vfScore").textContent =
    done === V.length
      ? `Resultado: ${ok} de ${V.length} certas`
      : `${ok} certas · ${V.length - done} faltam`;
}

function renderVF() {
  const box = $("vfList");
  box.innerHTML = "";

  V.forEach((q, i) => {
    const el = document.createElement("div");
    el.className = "vf-item";
    el.innerHTML = `<p>${i + 1}. ${q.s}</p>
      <div class="vf-btns">
        <button class="btn" data-r="1">Verdadeiro</button>
        <button class="btn" data-r="0">Falso</button>
      </div>
      <div class="vf-exp"><b>${q.a ? "Verdadeiro" : "Falso"}.</b> ${q.e}</div>`;

    const btns = [...el.querySelectorAll("button")];

    // trava os botões, pinta certo/errado e mostra a explicação
    const lock = (r) => {
      el.classList.add("done");
      btns.forEach((b) => {
        b.disabled = true;
        const v = b.dataset.r === "1";
        if (v === q.a) b.classList.add("right");
        else if (v === r) b.classList.add("wrong");
      });
    };

    // se já respondeu antes, restaura
    if (i in answers) lock(answers[i]);

    btns.forEach((b) =>
      b.addEventListener("click", () => {
        const r = b.dataset.r === "1";
        answers[i] = r;
        store.set("vf", answers);
        lock(r);
        vfScore();
      }),
    );

    box.appendChild(el);
  });
  vfScore();
}

// "refazer" zera as respostas
$("vfReset").onclick = () => {
  answers = {};
  store.set("vf", answers);
  renderVF();
};

renderVF();
