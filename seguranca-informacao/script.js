/* ===== DADOS ===== */
const TOPICOS = [
  {
    i: "🛡️",
    t: "01 · Ameaças, vulnerabilidades e ataques",
    p: [
      "Tríade CIA: Confidencialidade (só quem pode vê), Integridade (não alterado), Disponibilidade (acessível).",
      "Vulnerabilidade = fraqueza. Ameaça = perigo/agente. Exploit = ferramenta. Ataque = ação. Risco = probabilidade x impacto. Contramedida = proteção.",
      "Atacantes: hacktivista (protesto político), patrocinado pelo estado (espionagem/sabotagem), corretor de vulnerabilidade (acha falha e reporta ao fornecedor).",
      "Vetores de perda de dados: controle de acesso inadequado (senha fraca/roubada), e-mail, dispositivo não criptografado, nuvem, mídia removível, cópia impressa.",
      "Engenharia social ataca pessoas: treinar funcionários, não clicar em links atraentes, nunca redefinir senha por chat. E-mail com urgência extrema = hoax/phishing.",
    ],
  },
  {
    i: "🌐",
    t: "02 · Protegendo redes",
    p: [
      "Defesa em camadas: perímetro (firewall), rede (segmentação/VLAN), host (HIPS/antivírus), pessoas (treinamento).",
      "Ameaça interna passa pelo firewall de borda: criptografia (SSH, HTTPS, VPN) é a medida que limita o reconhecimento interno.",
      "Menor privilégio: cada um só acessa o que precisa.",
      "VPN = túnel criptografado sobre rede pública (IPsec ou SSL/TLS). Não bloqueia tráfego (firewall) nem detecta ataques (IDS/IPS).",
    ],
  },
  {
    i: "🧱",
    t: "03 · Atacar a fundação (IP, TCP, UDP, ARP, DNS)",
    p: [
      "IPv4 sem equivalente no IPv6: Identificação, Sinalizadores, Deslocamento de fragmento (fragmentação), além de Soma de verificação do cabeçalho e IHL. Checksum detecta corrupção no cabeçalho IPv4.",
      "TTL vira Hop Limit; Protocolo vira Next Header; ToS vira Traffic Class. IPv6 ganhou Flow Label.",
      "Handshake TCP: SYN, SYN-ACK, ACK. Inundação de SYN nunca completa o handshake e esgota conexões (DoS).",
      "Reconhecimento = coletar informação (sniffing, Nmap, ping sweep). Exploração de confiança e redirecionamento de porta usam sistema já comprometido.",
      "DNS: envenenamento de cache (resposta falsa leva a site malicioso), amplificação/reflexão (resolvedores abertos, mascara a origem), utilização de recursos (consome o servidor).",
      "ARP poisoning e DHCP spoofing (gateway falso) levam a homem no meio. Defesas: DAI, DHCP snooping, port security.",
    ],
  },
  {
    i: "💻",
    t: "04 · Atacar o que fazemos (aplicações)",
    p: [
      "Inserção/Injeção de SQL: código SQL no campo de entrada para atacar o banco. Defesa: consultas parametrizadas e validação.",
      "XSS (script entre sites): script roda no navegador de quem vê a página. Defesa: validar/sanitizar e codificar a saída, CSP.",
      "Estouro de buffer: escreve além da memória reservada. Inserção de XML e DLL: atacam XML e processos.",
      "Execução remota de código: servidor executa código do atacante.",
    ],
  },
  {
    i: "📶",
    t: "05 · Comunicação de rede sem fio",
    p: [
      "Descoberta de AP: modo passivo (AP envia beacon, cliente só escuta) e modo ativo (cliente envia probe request).",
      "WPA2-PSK/Personal: uma chave que deve corresponder à do AP. WPA2-Enterprise: 802.1X + RADIUS (usuário e senha do Active Directory ou certificado).",
      "Rogue AP / evil twin: AP falso com mesmo SSID. Sintoma: senha/conexão muda e se repete. Defesa: WIPS, WPA-Enterprise, VPN.",
      "Esconder SSID não é segurança real. WEP é quebrado.",
    ],
  },
  {
    i: "🏗️",
    t: "06 · Infraestrutura de segurança de rede",
    p: [
      "Firewall filtra tráfego. IDS detecta, IPS detecta e bloqueia. SIEM correlaciona logs.",
      "ZPF (firewall por zona): mesma zona permite; zonas diferentes bloqueia até haver política; interface em uma só zona; interface sem zona não fala com zonadas; políticas unidirecionais; inspect libera o retorno.",
      "SNMP: formato de mensagens entre gerenciadores e agentes (GET, SET, TRAP; MIB; UDP 161/162). Use SNMPv3. NTP = hora. NetFlow = estatística de fluxo. Wireshark = captura de pacotes. Syslog = logs.",
      "HIPS desvantagens: gerenciar vários sistemas operacionais e visão limitada da rede. Vantagens: vê tráfego decifrado, sabe se o ataque funcionou, não sofre evasão por fragmentação/TTL.",
    ],
  },
  {
    i: "🪟",
    t: "07 · O sistema operacional Windows",
    p: [
      "Pontos-chave: permissões NTFS, contas de usuário e grupos, Active Directory, Registro, serviços, Windows Update, Firewall e Defender.",
      "Menor privilégio: usuários comuns sem direitos de administrador.",
      "Patches são a principal defesa contra falhas conhecidas (CVE/CVSS).",
    ],
  },
  {
    i: "🐧",
    t: "08 · Visão geral do Linux",
    p: [
      "Permissões rwx para dono, grupo e outros (ex.: chmod 754). root é o administrador.",
      "Logs em /var/log. Comandos úteis: ls, cd, chmod, chown, grep, ps, sudo.",
      "SSH substitui Telnet para acesso remoto seguro.",
    ],
  },
  {
    i: "🔒",
    t: "09 · Proteção de sistemas e pontos finais",
    p: [
      "Hardening: remover o que não precisa, aplicar patches, desativar serviços e portas desnecessárias, senhas fortes e MFA.",
      "Antivírus/EDR/HIPS no host; criptografia de disco protege dispositivo perdido.",
      "Primeira barreira contra acesso indevido: autenticação forte (senha forte + MFA + bloqueio de tela).",
    ],
  },
  {
    i: "📋",
    t: "10 · Princípios, práticas e processos",
    p: [
      "Gestão de risco: identificar ativos, ameaças e vulnerabilidades; aplicar controles.",
      "Políticas, treinamento e resposta a incidentes. Gestão de vulnerabilidades: varredura, pentest, patches priorizados por CVSS.",
      "LGPD exige medidas técnicas para proteger dados pessoais.",
    ],
  },
];
const COLA = [
  ["SQL + campo de entrada", "Inserção/Injeção de SQL"],
  ["Script no navegador da vítima", "XSS"],
  ["Memória / além do buffer", "Estouro de buffer"],
  ["Fraqueza / falha", "Vulnerabilidade"],
  ["Perigo / agente", "Ameaça"],
  ["Ferramenta que explora", "Exploit"],
  ["Urgência + ameaça por e-mail", "Hoax / phishing"],
  ["Senha fraca ou roubada", "Controle de acesso inadequado"],
  ["Wireshark / Telnet texto claro", "Reconhecimento (sniffing)"],
  ["Muitas conexões TCP/Telnet, ninguém acessa", "Inundação de SYN (DoS)"],
  [
    "Gateway padrão falso, rede comutada",
    "DHCP spoofing / ARP poisoning (MITM)",
  ],
  ["Cache DNS falso, site falso", "Envenenamento de DNS"],
  ["Resolvedores abertos, mascara origem", "Amplificação e reflexão"],
  ["Consome recursos do servidor DNS", "Utilização de recursos"],
  ["Reconhecimento vindo de dentro", "Criptografia"],
  ["Detectar corrupção no cabeçalho IPv4", "Soma de verificação do cabeçalho"],
  [
    "IPv4 sem equivalente no IPv6",
    "Identificação, Sinalizadores, Deslocamento de fragmento (+ checksum, IHL)",
  ],
  ["Protesto político", "Hacktivista"],
  ["Espionagem em nome do governo", "Patrocinado pelo estado"],
  ["Acha falha e reporta", "Corretor de vulnerabilidade"],
  ["Senha da rede Wi-Fi muda e se repete", "Rogue AP / evil twin"],
  ["Descobrir AP", "Beacon (passivo) + probe request (ativo)"],
  ["AP envia beacon, cliente escuta", "Modo passivo"],
  ["WPA2-PSK", "Chave que corresponde à do AP"],
  ["Active Directory no Wi-Fi", "WPA2-Enterprise (RADIUS)"],
  ["Túnel criptografado em rede pública", "VPN"],
  [
    "Mesma zona / zonas diferentes (ZPF)",
    "Mesma permite; diferentes bloqueia sem política",
  ],
  ["Desvantagens do HIPS", "Vários SO + sem visão da rede"],
  ["Mensagens gerente/agente", "SNMP"],
  ["Hora dos dispositivos", "NTP"],
  ["Estatística de fluxo", "NetFlow"],
  ["Captura de pacotes", "Wireshark"],
  [
    "Engenharia social (3 boas práticas)",
    "Não clicar em links atraentes, educar funcionários, não resetar senha por chat",
  ],
  ["Primeira linha de defesa de acesso", "Autenticação / senha forte (+MFA)"],
];
const QUIZ = [
  [
    "Ataque ao banco SQL via campo de entrada do usuário?",
    ["Inserção de SQL", "XSS", "Estouro de buffer", "Inserção de DLL"],
    0,
    "Código SQL digitado no campo é executado pelo banco. XSS ataca o navegador; buffer overflow ataca a memória.",
  ],
  [
    "O que é uma vulnerabilidade?",
    [
      "Um método de ataque",
      "Uma fraqueza que torna o alvo suscetível a ataque",
      "Um perigo causado por hacker",
      "Um computador com dados sigilosos",
    ],
    1,
    "Vulnerabilidade é a fraqueza. Método = exploit; perigo = ameaça; computador = ativo.",
  ],
  [
    "E-mail diz que a senha expira em 5 minutos e pede redefinição. Classificação?",
    ["DDoS", "Carona (piggyback)", "Fraude (hoax)", "Negação de serviço"],
    2,
    "Urgência extrema + ameaça é padrão de hoax/phishing. Carona é ataque físico.",
  ],
  [
    "Senhas fracas ou roubadas dão acesso a dados corporativos. Vetor?",
    [
      "Mídia removível",
      "Controle de acesso inadequado",
      "Dispositivo não criptografado",
      "Cópia impressa",
    ],
    1,
    "Falha de autenticação = controle de acesso inadequado.",
  ],
  [
    "Hacktivistas são motivados por…",
    [
      "Dinheiro",
      "Espionagem de governo",
      "Declarações políticas e conscientização",
      "Reportar falhas ao fornecedor",
    ],
    2,
    "Hacktivista = protesto político/social.",
  ],
  [
    "Atacante patrocinado pelo estado…",
    [
      "Reporta falhas aos fornecedores",
      "Coleta informações ou sabota em nome do governo",
      "Protesta politicamente",
      "Vende exploits",
    ],
    1,
    "Age em nome de um governo.",
  ],
  [
    "Funcionário usa Wireshark para achar senhas Telnet. Tipo de ataque (opções: reconhecimento, exploração de confiança, redirecionamento de porta, DoS)?",
    [
      "Reconhecimento",
      "Exploração de confiança",
      "Redirecionamento de porta",
      "Negação de serviço",
    ],
    0,
    "Capturar tráfego para coletar informação é reconhecimento (sniffing).",
  ],
  [
    "Várias solicitações Telnet aleatórias impedem o admin de acessar o roteador (opções: spoofing, inundação SYN, envenenamento DNS, MITM).",
    [
      "Falsificação",
      "Inundação de SYN",
      "Envenenamento de DNS",
      "Homem no meio",
    ],
    1,
    "Muitas conexões TCP meio abertas esgotam o dispositivo.",
  ],
  [
    "Melhor medida contra reconhecimento vindo de dentro do campus?",
    [
      "Firewall de borda",
      "Filtragem RFC 3704",
      "Criptografia do tráfego",
      "Mais guardas",
    ],
    2,
    "O atacante já está dentro; criptografia torna o capturado inútil.",
  ],
  [
    "Gateway padrão falso em rede comutada para interceptar tráfego. Qual o mecanismo mais ligado a 'gateway falso'?",
    ["Inundação SYN", "DHCP spoofing", "Envenenamento de DNS", "Ping da morte"],
    1,
    "Servidor DHCP falso entrega o gateway do atacante. ARP poisoning também leva a MITM.",
  ],
  [
    "Vulnerabilidade que injeta scripts em páginas vistas por usuários?",
    ["XSS", "SQL injection", "Buffer overflow", "Execução remota de código"],
    0,
    "Script roda no navegador de quem visita a página.",
  ],
  [
    "Senha do Wi-Fi muda sem aviso e o problema volta após 1 hora.",
    ["Erro do usuário", "Rogue AP / evil twin", "DoS", "Força bruta"],
    1,
    "AP falso com mesmo SSID continua ativo.",
  ],
  [
    "Dois métodos de uma NIC sem fio descobrir um AP?",
    [
      "Receber beacon e enviar probe request",
      "Enviar ARP e DHCP",
      "Handshake de 3 vias e multicast",
      "Associação e autenticação",
    ],
    0,
    "Passivo (beacon) e ativo (probe request).",
  ],
  [
    "WPA2-PSK: que credencial os laptops precisam?",
    [
      "Usuário e senha do AD",
      "Certificado digital",
      "Chave que corresponde à do AP",
      "Usuário e senha configurados no AP",
    ],
    2,
    "PSK = chave pré-compartilhada igual à do AP.",
  ],
  [
    "Característica do modo passivo de descoberta WLAN?",
    [
      "Cliente envia probe request",
      "AP envia beacons periódicos com o SSID",
      "Cliente deve saber o SSID",
      "Beaconing está desativado",
    ],
    1,
    "No passivo o AP anuncia e o cliente só escuta.",
  ],
  [
    "O que descreve uma VPN?",
    [
      "Linha física dedicada",
      "Túnel criptografado sobre rede pública",
      "Bloqueio de tráfego não autorizado",
      "Detecção de atividade maliciosa",
    ],
    1,
    "Bloqueio = firewall; detecção = IDS/IPS.",
  ],
  [
    "Regra do ZPF para interfaces?",
    [
      "Zonas diferentes se comunicam por padrão",
      "Mesma zona comunica por padrão; zonas diferentes são bloqueadas sem política",
      "Interface pode ter várias zonas",
      "Políticas são bidirecionais",
    ],
    1,
    "Mesma zona permite; entre zonas é negado até haver política (unidirecional).",
  ],
  [
    "Duas desvantagens do HIPS?",
    [
      "Não vê tráfego decifrado e sofre fragmentação",
      "Verificar suporte a todos os SO e dificuldade de visão de rede",
      "Não sabe se o ataque funcionou",
      "Vulnerável a TTL variável",
    ],
    1,
    "As outras são limitações do IPS de rede.",
  ],
  [
    "Função do SNMP?",
    [
      "Sincronizar hora",
      "Formato de mensagem entre gestores e agentes",
      "Estatística de pacotes em roteador",
      "Capturar pacotes da NIC",
    ],
    1,
    "Hora = NTP; estatística = NetFlow; captura = Wireshark.",
  ],
  [
    "Campo IPv4 que detecta corrupção no cabeçalho?",
    ["TTL", "Protocolo", "Soma de verificação do cabeçalho", "Identificação"],
    2,
    "Header Checksum; foi removido no IPv6.",
  ],
  [
    "Envenenamento de cache DNS é…",
    [
      "Resolvedores abertos para amplificar",
      "Consumir recursos do servidor",
      "Enviar informação falsa para redirecionar a sites maliciosos",
      "Capturar pacotes",
    ],
    2,
    "Amplificação usa resolvedores abertos; utilização de recursos consome o servidor.",
  ],
  [
    "Boas práticas contra engenharia social (escolha a correta)",
    [
      "Instalar mais guardas",
      "Educar funcionários sobre políticas",
      "Redefinir senhas por chat",
      "Só firewall",
    ],
    1,
    "Defesa é humana: treino, política, verificação.",
  ],
  [
    "Na tríade CIA, DDoS ataca…",
    ["Confidencialidade", "Integridade", "Disponibilidade", "Autenticidade"],
    2,
    "Derrubar o serviço é ataque à disponibilidade.",
  ],
  [
    "Qual protocolo substitui o Telnet com criptografia?",
    ["FTP", "SSH", "HTTP", "SNMPv1"],
    1,
    "SSH criptografa a sessão; Telnet envia em texto claro.",
  ],
  [
    "Corretor de vulnerabilidade…",
    [
      "Rouba dados",
      "Descobre falhas e reporta ao fornecedor",
      "Derruba sites",
      "Faz espionagem",
    ],
    1,
    "Muitas vezes via programas de bug bounty.",
  ],
];
const ROAD = [
  [
    "Tríade CIA e termos (vulnerabilidade, ameaça, exploit, risco)",
    "Base de tudo. Veja Resumos 01.",
  ],
  [
    "Tipos de atacantes e vetores de perda de dados",
    "Hacktivista, estado, corretor; controle de acesso inadequado.",
  ],
  ["Engenharia social", "Hoax, phishing, defesas humanas."],
  ["Ataques de rede", "Reconhecimento, SYN flood, DNS, ARP/DHCP, MITM."],
  ["Ataques a aplicações", "SQL, XSS, buffer overflow."],
  ["Cabeçalhos IPv4 x IPv6", "Checksum, fragmentação."],
  ["Wi-Fi", "Beacon/probe, WPA2-PSK x Enterprise, rogue AP."],
  ["Infraestrutura", "VPN, ZPF, HIPS x NIPS, SNMP, NTP, NetFlow."],
  ["Windows, Linux e endpoints", "Permissões, hardening, patches."],
  ["Quiz até acertar 90%+", "Refaça os erros e leia a Cola."],
];
const TREE = {
  start: {
    q: "O que a questão descreve?",
    o: [
      ["Ataque de rede", "net"],
      ["Web / aplicação", "web"],
      ["Rede sem fio", "wifi"],
      ["Pessoas / conceitos", "pp"],
      ["Ferramenta / defesa", "tool"],
    ],
  },
  net: {
    q: "Qual o efeito principal?",
    o: [
      [
        "Ninguém consegue acessar o serviço",
        "= Inundação de SYN / Negação de serviço",
      ],
      [
        "Captura e lê tráfego (Wireshark)",
        "= Reconhecimento (sniffing). Defesa: criptografia",
      ],
      [
        "Gateway falso / tráfego redirecionado",
        "= DHCP spoofing ou ARP poisoning (homem no meio)",
      ],
      ["Usuário vai a site falso pelo nome", "= Envenenamento de DNS"],
    ],
  },
  web: {
    q: "Onde o código é executado?",
    o: [
      ["No banco de dados", "= Inserção de SQL"],
      ["No navegador do usuário", "= XSS"],
      ["Na memória do programa", "= Estouro de buffer"],
    ],
  },
  wifi: {
    q: "O que a questão diz?",
    o: [
      ["Senha/conexão muda e se repete", "= Rogue AP / evil twin"],
      ["Como descobrir um AP", "= Beacon (passivo) + probe request (ativo)"],
      ["WPA2-PSK", "= Uma chave que corresponde à do AP"],
      ["Usuário do Active Directory", "= WPA2-Enterprise (802.1X + RADIUS)"],
    ],
  },
  pp: {
    q: "Qual a pista?",
    o: [
      ["Urgência e ameaça por e-mail", "= Hoax / phishing"],
      ["Senha fraca ou roubada", "= Controle de acesso inadequado"],
      ["Fraqueza ou falha", "= Vulnerabilidade"],
      ["Protesto político", "= Hacktivista"],
    ],
  },
  tool: {
    q: "Qual ferramenta?",
    o: [
      ["Túnel criptografado", "= VPN"],
      ["Gerente e agentes", "= SNMP (v3 é seguro)"],
      [
        "Zonas de segurança",
        "= ZPF: mesma zona permite, zonas diferentes bloqueiam",
      ],
      [
        "Antivírus no host",
        "= HIPS: difícil gerenciar vários SO e sem visão da rede",
      ],
    ],
  },
};

/* ===== APP ===== */
const $ = (s) => document.querySelector(s);
const card = (h, i) =>
  `<div class="card" style="animation-delay:${i * 60}ms">${h}</div>`;
const ls = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch (e) {
    return d;
  }
};
const sv = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {}
};
const PAGES = [
  ["home", "Início"],
  ["resumos", "Resumos"],
  ["quiz", "Quiz"],
  ["fluxo", "Fluxograma"],
  ["cola", "Cola rápida"],
];
$("#menu").innerHTML = PAGES.map(
  (p) => `<a href="#${p[0]}" data-p="${p[0]}">${p[1]}</a>`,
).join("");
function route() {
  const h = (location.hash || "#home").slice(1),
    p = PAGES.some((x) => x[0] == h) ? h : "home";
  document.querySelectorAll(".page").forEach((s) => (s.hidden = s.id != p));
  document
    .querySelectorAll("#menu a")
    .forEach((a) => a.classList.toggle("on", a.dataset.p == p));
  scrollTo(0, 0);
}
addEventListener("hashchange", route);

$("#homeGrid").innerHTML = [
  ["📚", "Resumos", "Os 10 tópicos em cards", "resumos"],
  ["🎯", "Quiz", "Perguntas com explicação", "quiz"],
  ["🗺️", "Fluxograma", "Trilha e árvore de decisão", "fluxo"],
  ["⚡", "Cola rápida", "Palavra-chave = resposta", "cola"],
]
  .map(
    (c, i) =>
      `<a class="card" style="animation-delay:${i * 80}ms" href="#${c[3]}"><div class="ico">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p></a>`,
  )
  .join("");

const drawR = (q) => {
  $("#list").innerHTML = TOPICOS.filter((t) =>
    (t.t + t.p.join()).toLowerCase().includes(q),
  )
    .map((t, i) =>
      card(
        `<div class="ico">${t.i}</div><h3>${t.t}</h3><ul>${t.p.map((x) => `<li>${x}</li>`).join("")}</ul>`,
        i,
      ),
    )
    .join("");
};
$("#q1").oninput = (e) => drawR(e.target.value.toLowerCase());
drawR("");

const drawC = (q) => {
  $("#fc").innerHTML = COLA.filter((c) =>
    (c[0] + c[1]).toLowerCase().includes(q),
  )
    .map(
      (c) =>
        `<div class="flip" onclick="this.classList.toggle('f')"><div><p>${c[0]}</p><p>${c[1]}</p></div></div>`,
    )
    .join("");
};
$("#q2").oninput = (e) => drawC(e.target.value.toLowerCase());
drawC("");

let q,
  i,
  s,
  wrong = [];
function start(only) {
  q = (only || QUIZ.map((_, k) => k)).slice().sort(() => Math.random() - 0.5);
  i = 0;
  s = 0;
  wrong = [];
  show();
}
function show() {
  if (i >= q.length) {
    $("#box").innerHTML =
      `<div class="card"><h2>Resultado: ${s}/${q.length} (${Math.round((100 * s) / q.length)}%)</h2><div class="bar"><i style="width:${(100 * s) / q.length}%"></i></div><p>${s == q.length ? "Perfeito! 🎉" : "Revise os erros."}</p><button class="btn" onclick="start()">Refazer tudo</button> ${wrong.length ? `<button class="btn alt" onclick="start(wrong)">Refazer só os erros</button>` : ""}</div>`;
    return;
  }
  const d = QUIZ[q[i]];
  $("#box").innerHTML =
    `<div class="crumb">Questão ${i + 1} de ${q.length} · acertos: ${s}</div><div class="bar"><i style="width:${(100 * i) / q.length}%"></i></div><div class="card"><h3>${d[0]}</h3>${d[1].map((o, k) => `<button class="opt" data-k="${k}">${o}</button>`).join("")}<div id="ex"></div></div>`;
  document.querySelectorAll(".opt[data-k]").forEach(
    (b) =>
      (b.onclick = () => {
        const k = +b.dataset.k;
        document.querySelectorAll(".opt[data-k]").forEach((x) => {
          x.disabled = true;
          if (+x.dataset.k == d[2]) x.classList.add("ok");
        });
        if (k == d[2]) s++;
        else {
          b.classList.add("no");
          wrong.push(q[i]);
        }
        $("#ex").innerHTML =
          `<div class="exp"><b>${k == d[2] ? "Correto!" : "Incorreto."}</b> ${d[3]}</div><p><button class="btn" id="nx">${i + 1 < q.length ? "Próxima" : "Ver resultado"}</button></p>`;
        $("#nx").onclick = () => {
          i++;
          show();
        };
      }),
  );
}
start();

const done = ls("road", []);
$("#road").innerHTML = ROAD.map(
  (r, k) =>
    `<div class="step ${done.includes(k) ? "done" : ""}" data-k="${k}"><div class="dot">${k + 1}</div>${card(`<h3>${r[0]}</h3><p>${r[1]}</p>`, k)}</div>`,
).join("");
document.querySelectorAll(".dot").forEach(
  (d) =>
    (d.onclick = () => {
      const st = d.parentNode,
        k = +st.dataset.k,
        a = ls("road", []);
      st.classList.toggle("done");
      sv(
        "road",
        st.classList.contains("done") ? [...a, k] : a.filter((x) => x != k),
      );
    }),
);
let path = [];
function nd(id) {
  const n = TREE[id];
  $("#tree").innerHTML =
    `<div class="crumb">${path.join(" › ")}</div><div class="node">${n.q}</div>` +
    n.o
      .map((o) => `<button class="opt" data-n="${o[1]}">${o[0]}</button>`)
      .join("");
  document.querySelectorAll("#tree .opt").forEach(
    (b) =>
      (b.onclick = () => {
        path.push(b.textContent);
        const n = b.dataset.n;
        if (n[0] == "=") {
          $("#tree").innerHTML =
            `<div class="crumb">${path.join(" › ")}</div><div class="res"><b>Resposta provável:</b> ${n.slice(2)}</div><p><button class="btn" id="rs">Recomeçar</button></p>`;
          $("#rs").onclick = () => {
            path = [];
            nd("start");
          };
        } else nd(n);
      }),
  );
}
nd("start");
route();
