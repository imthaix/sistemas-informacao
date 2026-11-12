/* =========================================================
   Revisão — Redes e Segurança
   Lógica da página: tema, abas, questões, V ou F e flashcards
   ========================================================= */

/* ---------------------------------------------------------
   DADOS
   m = módulo (or = 1, gr = 2, bl = 3, br = 4, são as classes
       de cor que ficaram dos módulos)
   --------------------------------------------------------- */

/* Questões objetivas
   s = enunciado, o = alternativas, a = índice da certa, e = explicação */
const Q = [
  {
    m: "or",
    s: "Uma empresa quer separar os computadores do TI e do RH, que estão no mesmo switch, sem comprar equipamento novo. Qual a solução?",
    o: [
      "Instalar um hub",
      "Criar VLANs",
      "Comprar um segundo switch",
      "Usar um repetidor",
    ],
    a: 1,
    e: '"Separar sem hardware extra" é a palavra-chave de VLAN: divide um switch físico em redes lógicas isoladas.',
  },
  {
    m: "or",
    s: "Um PC da VLAN 10 envia um broadcast. Quem recebe?",
    o: [
      "Todos os PCs do switch",
      "Só os PCs da VLAN 10",
      "Só o roteador",
      "Todos os PCs da VLAN 10 e da VLAN 20",
    ],
    a: 1,
    e: "Cada VLAN é um domínio de broadcast separado. O broadcast nunca atravessa para outra VLAN sem roteador.",
  },
  {
    m: "or",
    s: "Um PC da VLAN 10 precisa falar com um PC da VLAN 20. O que é necessário?",
    o: [
      "Nada, estão no mesmo switch",
      "Um hub entre eles",
      "Um roteador ou switch Layer 3",
      "Mudar o MAC dos PCs",
    ],
    a: 2,
    e: "VLANs diferentes são redes diferentes. A comunicação entre elas exige roteamento.",
  },
  {
    m: "or",
    s: "Que tipo de porta liga dois switches transportando as VLANs 10, 20 e 30 num único cabo?",
    o: ["Access", "Trunk", "Console", "Nativa"],
    a: 1,
    e: "Trunk transporta várias VLANs entre switches, identificando cada quadro com a tag 802.1Q.",
  },
  {
    m: "or",
    s: "Uma impressora será ligada ao switch na VLAN do financeiro. A porta deve ser:",
    o: ["Trunk", "Access", "Root", "Gateway"],
    a: 1,
    e: "Dispositivo final (PC, impressora) usa porta access, que pertence a uma única VLAN.",
  },
  {
    m: "or",
    s: 'Uma questão fala em "marcação de quadros" e "VLAN ID". Qual padrão está sendo cobrado?',
    o: ["802.1X", "802.11", "802.1Q", "802.3"],
    a: 2,
    e: "802.1Q insere uma tag de 4 bytes no quadro Ethernet indicando a VLAN. (802.1X é autenticação; 802.11 é Wi-Fi.)",
  },
  {
    m: "or",
    s: "Numa porta trunk, o tráfego que chega SEM tag pertence a qual VLAN?",
    o: [
      "À VLAN nativa (padrão VLAN 1)",
      "À VLAN de maior número",
      "É descartado sempre",
      "À VLAN do roteador",
    ],
    a: 0,
    e: "Tráfego sem tag no trunk vai para a VLAN nativa, que por padrão é a VLAN 1. Mal configurada, é risco de segurança.",
  },
  {
    m: "gr",
    s: "Quantos bits tem um endereço MAC?",
    o: ["32", "48", "64", "128"],
    a: 1,
    e: "MAC tem 48 bits (6 bytes), escrito em hexadecimal. 32 bits é o IPv4; 128, o IPv6.",
  },
  {
    m: "gr",
    s: "Os 3 primeiros bytes do MAC identificam:",
    o: ["A VLAN", "A sub-rede", "O fabricante (OUI)", "O gateway"],
    a: 2,
    e: "Primeiros 3 bytes = OUI, o identificador do fabricante. Últimos 3 = identificador exclusivo do dispositivo.",
  },
  {
    m: "gr",
    s: "Onde o switch Layer 2 guarda a relação entre porta e endereço MAC?",
    o: ["Tabela de rotas", "Tabela CAM", "Tabela ARP do roteador", "ACL"],
    a: 1,
    e: "A tabela CAM associa porta ↔ MAC. O switch aprende isso automaticamente.",
  },
  {
    m: "gr",
    s: "O switch recebe um quadro para um MAC que ele ainda não conhece. O que faz?",
    o: [
      "Descarta o quadro",
      "Manda ao roteador",
      "Faz flood: envia por todas as portas da VLAN, exceto a de origem",
      "Espera o STP decidir",
    ],
    a: 2,
    e: "Flood só acontece em broadcast ou MAC desconhecido. Quando o destino responder, o switch aprende e passa a usar unicast.",
  },
  {
    m: "gr",
    s: "Quantos hosts utilizáveis existem em 192.168.1.0/25?",
    o: ["254", "128", "126", "62"],
    a: 2,
    e: "32 − 25 = 7 bits para hosts. 2⁷ = 128, menos 2 (rede e broadcast) = 126.",
  },
  {
    m: "gr",
    s: "Na rede 192.168.1.0/24, o endereço 192.168.1.0 é:",
    o: [
      "O primeiro host",
      "O gateway obrigatório",
      "O endereço de rede",
      "O broadcast",
    ],
    a: 2,
    e: "O primeiro IP do bloco é o endereço de rede e não pode ser dado a um host. É o erro comum citado no slide.",
  },
  {
    m: "gr",
    s: "Um PC está sem gateway padrão configurado. O que acontece?",
    o: [
      "Não acessa nada",
      "Só se comunica com a própria sub-rede",
      "Acessa a internet normalmente",
      "Perde o endereço MAC",
    ],
    a: 1,
    e: 'Sem gateway, o host fica "preso" na própria sub-rede: o switch resolve o local, mas ninguém leva os pacotes para fora.',
  },
  {
    m: "gr",
    s: "Dois hosts têm prefixos de rede diferentes. Quem resolve a comunicação?",
    o: ["O switch Layer 2", "O roteador", "O servidor RADIUS", "O IDS"],
    a: 1,
    e: "Regra rápida: mesmo prefixo → switch; prefixo diferente → roteador.",
  },
  {
    m: "bl",
    s: "Qual o principal objetivo do STP?",
    o: [
      "Aumentar a velocidade dos links",
      "Evitar loops em topologias com caminhos redundantes",
      "Criptografar o tráfego",
      "Distribuir IPs",
    ],
    a: 1,
    e: "O STP bloqueia portas redundantes para evitar loops, mantendo-as como backup.",
  },
  {
    m: "bl",
    s: "Switch A: prioridade 32768, MAC 00:00:00:00:00:11. Switch B: prioridade 32768, MAC 00:00:00:00:00:AA. Switch C: prioridade 4096, MAC 00:00:00:00:00:FF. Quem vira Root Bridge?",
    o: ["Switch A", "Switch B", "Switch C", "Empate, nenhum"],
    a: 2,
    e: "Compara primeiro a prioridade: 4096 é a menor, então C vence, mesmo tendo o maior MAC. O MAC só desempata quando as prioridades são iguais.",
  },
  {
    m: "bl",
    s: "Se todos os switches estão com a prioridade padrão, quem vence a eleição?",
    o: [
      "O de maior MAC",
      "O de menor MAC",
      "O mais antigo",
      "O com mais portas",
    ],
    a: 1,
    e: "Bridge ID = prioridade + MAC. Com prioridades iguais, o menor MAC desempata.",
  },
  {
    m: "bl",
    s: "Qual a ordem correta dos estados de porta do STP?",
    o: [
      "Listening → Blocking → Forwarding → Learning",
      "Blocking → Listening → Learning → Forwarding",
      "Learning → Listening → Blocking → Forwarding",
      "Forwarding → Learning → Listening → Blocking",
    ],
    a: 1,
    e: "Blocking → Listening → Learning → Forwarding: primeiro escuta, depois aprende MACs, só então encaminha.",
  },
  {
    m: "bl",
    s: "Rede com caminhos redundantes e sem STP. O que tende a acontecer?",
    o: [
      "Nada, a rede fica mais rápida",
      "Broadcast storm e rede travada",
      "Os IPs se duplicam",
      "O firewall bloqueia tudo",
    ],
    a: 1,
    e: "Broadcast enviado → quadro em loop → CPU a 100% → rede parada.",
  },
  {
    m: "bl",
    s: "Para forçar um switch específico a ser Root Bridge, o administrador deve:",
    o: [
      "Aumentar a prioridade dele",
      "Diminuir a prioridade dele",
      "Trocar o MAC por um maior",
      "Desligar os outros switches",
    ],
    a: 1,
    e: "Menor valor vence. Diminuir a prioridade (ex.: 4096) garante a eleição.",
  },
  {
    m: "br",
    s: "Qual firewall sabe se um pacote faz parte de uma conexão legítima já estabelecida?",
    o: ["Stateless", "Stateful", "ACL padrão", "Hub"],
    a: 1,
    e: "Stateful rastreia o estado das conexões. Stateless olha cada pacote isoladamente.",
  },
  {
    m: "br",
    s: "Regras: (1) Permitir TCP 443 de qualquer origem; (2) Bloquear IP 10.0.0.5; (3) Deny all. O IP 10.0.0.5 tenta acessar a porta 443. Resultado?",
    o: [
      "Bloqueado pela regra 2",
      "Bloqueado pela regra 3",
      "Permitido pela regra 1",
      "Depende do horário",
    ],
    a: 2,
    e: "Leitura de cima para baixo: a regra 1 casa primeiro e é aplicada na hora. A regra 2 nem é avaliada. Por isso a ordem é tudo.",
  },
  {
    m: "br",
    s: "Na mesma lista, um pacote UDP na porta 53 vindo de 8.8.8.8. Resultado?",
    o: [
      "Permitido pela regra 1",
      "Bloqueado pelo deny all",
      "Permitido porque não foi bloqueado",
      "Bloqueado pela regra 2",
    ],
    a: 1,
    e: "Não casa com a regra 1 (que é TCP 443) nem com a 2 (outro IP). Cai no deny all: tudo que não foi explicitamente permitido é bloqueado.",
  },
  {
    m: "br",
    s: "Onde deve ficar um servidor web que precisa ser acessado pela internet?",
    o: [
      "Na rede interna",
      "Na DMZ",
      "Na VLAN nativa",
      "Fora de qualquer firewall",
    ],
    a: 1,
    e: "Servidores públicos ficam na DMZ: expostos à internet, mas isolados da rede interna por outro firewall.",
  },
  {
    m: "br",
    s: "Liberar a cada usuário apenas o acesso estritamente necessário é o princípio:",
    o: [
      "Da defesa em profundidade",
      "Do menor privilégio",
      "Do deny all",
      "Da redundância",
    ],
    a: 1,
    e: "Menor privilégio = só o necessário. Defesa em profundidade = várias camadas de proteção.",
  },
  {
    m: "br",
    s: "Uma ACL que filtra apenas pelo IP de origem é ___ e deve ser aplicada perto ___.",
    o: [
      "estendida / da origem",
      "padrão / do destino",
      "padrão / da origem",
      "estendida / do destino",
    ],
    a: 1,
    e: "ACL padrão só vê origem, então fica perto do destino para não bloquear demais. A estendida fica perto da origem.",
  },
  {
    m: "br",
    s: "Um sistema detecta uma intrusão e gera um alerta, mas não bloqueia o tráfego. Ele é um:",
    o: ["IPS", "IDS", "SIEM", "Firewall stateful"],
    a: 1,
    e: "IDS é passivo: detecta e alerta. IPS detecta e bloqueia.",
  },
  {
    m: "br",
    s: "Qual ferramenta coleta e correlaciona logs de vários sistemas para análise centralizada?",
    o: ["IDS", "ACL", "SIEM", "RADIUS"],
    a: 2,
    e: "SIEM centraliza e cruza logs de múltiplos sistemas para detectar padrões.",
  },
  {
    m: "br",
    s: "No 802.1X, qual o papel do switch?",
    o: [
      "Suplicante",
      "Autenticador",
      "Servidor de autenticação",
      "Root Bridge",
    ],
    a: 1,
    e: "Suplicante = cliente; autenticador = porta do switch; servidor RADIUS = valida as credenciais.",
  },
  {
    m: "br",
    s: "O framework AAA aplicado pelo RADIUS significa:",
    o: [
      "Acesso, Alerta e Auditoria",
      "Autenticação, Autorização e Auditoria",
      "Análise, Aprovação e Acesso",
      "Autenticação, Alerta e Aplicação",
    ],
    a: 1,
    e: "Autenticação (quem é), Autorização (o que pode) e Auditoria (registro do que fez).",
  },
  {
    m: "br",
    s: "Um atacante envia quadros com tags 802.1Q duplas para acessar outra VLAN. Esse ataque é:",
    o: ["STP spoofing", "VLAN hopping", "Broadcast storm", "DDoS externo"],
    a: 1,
    e: "VLAN hopping explora trunk mal configurado (geralmente a VLAN nativa) com tag dupla.",
  },
  {
    m: "br",
    s: "Um atacante anuncia prioridade STP menor que a de todos os switches. O risco é:",
    o: [
      "Ele virar Root Bridge e interceptar o tráfego",
      "A rede ficar mais rápida",
      "Os MACs mudarem",
      "O firewall ser desligado",
    ],
    a: 0,
    e: 'STP spoofing: menor prioridade vence a eleição, e o atacante passa a ver o tráfego que passa pela "raiz".',
  },
];

/* Verdadeiro ou falso
   s = afirmação, a = true/false, e = explicação */
const V = [
  {
    m: "or",
    s: "Dispositivos em VLANs diferentes se comunicam diretamente pelo switch Layer 2.",
    a: false,
    e: "Precisa de roteador ou switch Layer 3.",
  },
  {
    m: "or",
    s: "Cada VLAN é um domínio de broadcast separado.",
    a: true,
    e: "Por isso VLANs reduzem tráfego desnecessário.",
  },
  {
    m: "or",
    s: "O roteador repassa broadcasts de uma rede para outra.",
    a: false,
    e: "Roteador bloqueia broadcast entre redes diferentes.",
  },
  {
    m: "or",
    s: "Porta trunk é a porta com maior velocidade do switch.",
    a: false,
    e: "Trunk é sobre transportar várias VLANs, não velocidade.",
  },
  {
    m: "or",
    s: "O 802.1Q insere uma tag de 4 bytes no quadro Ethernet.",
    a: true,
    e: "Essa tag carrega o VLAN ID ao cruzar o trunk.",
  },
  {
    m: "or",
    s: "Por padrão, a VLAN nativa é a VLAN 1.",
    a: true,
    e: "E pode ser risco de segurança se mal configurada.",
  },
  {
    m: "gr",
    s: "O endereço MAC atravessa roteadores sem ser alterado.",
    a: false,
    e: "O MAC é substituído a cada salto; quem segue até o fim é o IP.",
  },
  {
    m: "gr",
    s: "O switch Layer 2 entende endereços IP e roteia pacotes.",
    a: false,
    e: "Ele usa só MAC. Para rotear: roteador ou switch Layer 3.",
  },
  {
    m: "gr",
    s: "Uma rede /24 tem 254 hosts utilizáveis.",
    a: true,
    e: "2⁸ − 2 = 254.",
  },
  {
    m: "gr",
    s: "O switch faz flood de todos os quadros que recebe.",
    a: false,
    e: "Só em broadcast ou MAC desconhecido. No resto, unicast pela porta certa.",
  },
  {
    m: "bl",
    s: "Na eleição do STP, vence o switch com MAIOR prioridade.",
    a: false,
    e: "Menor valor vence. Padrão: 32768.",
  },
  {
    m: "bl",
    s: "Todas as portas da Root Bridge ficam em estado Forwarding.",
    a: true,
    e: "A raiz não bloqueia portas; os bloqueios acontecem nos outros switches.",
  },
  {
    m: "bl",
    s: "Redundância de links sempre causa problemas na rede.",
    a: false,
    e: "Com STP, a redundância é segura e vira backup automático.",
  },
  {
    m: "br",
    s: "A ordem das regras de um firewall não importa.",
    a: false,
    e: "A primeira regra que casar é aplicada. A ordem é tudo.",
  },
  {
    m: "br",
    s: "Firewall stateless analisa cada pacote isoladamente.",
    a: true,
    e: "Sem contexto da conexão. Mais simples, menos seguro.",
  },
  {
    m: "br",
    s: "O IPS apenas gera alertas, sem bloquear.",
    a: false,
    e: "Esse é o IDS. O IPS bloqueia em tempo real.",
  },
  {
    m: "br",
    s: "O 802.1X só funciona em redes Wi-Fi.",
    a: false,
    e: "Funciona também em rede cabeada.",
  },
  {
    m: "br",
    s: "Se um servidor da DMZ for comprometido, a rede interna continua protegida pelo firewall interno.",
    a: true,
    e: "Essa é a ideia de contenção de danos da DMZ.",
  },
  {
    m: "br",
    s: "A ACL padrão filtra por porta e protocolo.",
    a: false,
    e: "A padrão filtra só por IP de origem. Porta e protocolo são da estendida.",
  },
  {
    m: "br",
    s: "ACL estendida deve ser aplicada próxima à origem do tráfego.",
    a: true,
    e: "Como é bem específica, pode barrar logo na saída sem atrapalhar outros fluxos.",
  },
];

/* Flashcards
   t = termo (frente), d = definição, a = analogia (verso) */
const F = [
  {
    m: "or",
    t: "VLAN",
    d: "Divide um switch físico em várias redes lógicas isoladas, sem hardware extra.",
    a: "Paredes que criam salas separadas dentro do mesmo prédio.",
  },
  {
    m: "or",
    t: "Broadcast",
    d: "Mensagem enviada a todos os dispositivos da rede ao mesmo tempo.",
    a: "Alguém gritando na sala: todo mundo ouve.",
  },
  {
    m: "or",
    t: "Domínio de broadcast",
    d: "Área até onde um broadcast chega. Cada VLAN é um domínio separado; roteadores o limitam.",
    a: "O tamanho da sala onde o grito é ouvido.",
  },
  {
    m: "or",
    t: "Porta trunk",
    d: "Transporta várias VLANs num único cabo entre switches, usando 802.1Q.",
    a: "Ônibus levando gente de várias salas, cada um com pulseira colorida.",
  },
  {
    m: "or",
    t: "Porta access",
    d: "Pertence a uma única VLAN e liga dispositivos finais (PC, impressora).",
    a: "A porta de uma sala específica.",
  },
  {
    m: "or",
    t: "802.1Q",
    d: "Padrão que insere uma tag de 4 bytes no quadro para indicar a VLAN no trunk.",
    a: "Etiqueta na mala do aeroporto.",
  },
  {
    m: "or",
    t: "VLAN nativa",
    d: "Tráfego sem tag numa porta trunk. Padrão: VLAN 1. Risco se mal configurada.",
    a: "Mala sem etiqueta que vai para o destino padrão.",
  },
  {
    m: "gr",
    t: "Endereço MAC",
    d: "Identificador físico de 48 bits da placa de rede, em hexadecimal. Usado só na rede local.",
    a: "Número de chassi do carro.",
  },
  {
    m: "gr",
    t: "OUI",
    d: "Os 3 primeiros bytes do MAC: identificam o fabricante.",
    a: "A montadora do carro.",
  },
  {
    m: "gr",
    t: "Tabela CAM",
    d: "Tabela do switch que associa cada porta a um endereço MAC. Aprendida automaticamente.",
    a: "Caderninho do carteiro: quem mora em cada porta.",
  },
  {
    m: "gr",
    t: "Flood",
    d: "Envio por todas as portas. Só em broadcast ou MAC desconhecido.",
    a: "Carteiro novo batendo em todas as portas.",
  },
  {
    m: "gr",
    t: "Unicast",
    d: "Envio para um único destinatário, pela porta certa.",
    a: "Carta entregue direto na casa certa.",
  },
  {
    m: "gr",
    t: "Máscara de sub-rede",
    d: "Define quais IPs pertencem à mesma rede (ex.: /24).",
    a: "A regra que diz quais casas são do mesmo quarteirão.",
  },
  {
    m: "gr",
    t: "Endereço de rede",
    d: "Primeiro IP do bloco. Identifica a rede; não pode ser usado por host.",
    a: "A placa com o nome da rua, não uma casa.",
  },
  {
    m: "gr",
    t: "Cálculo de hosts",
    d: "2^(32 − máscara) − 2. /24 = 254; /25 = 126; /26 = 62.",
    a: 'Tira o "nome da rua" e o "megafone" (broadcast) da conta.',
  },
  {
    m: "gr",
    t: "Gateway padrão",
    d: "Endereço do roteador que leva pacotes para outras redes. Sem ele, o host fica preso na sub-rede.",
    a: "A portaria do condomínio.",
  },
  {
    m: "gr",
    t: "Roteamento",
    d: "Escolher o melhor caminho entre redes diferentes usando a tabela de rotas.",
    a: "O GPS escolhendo a rota.",
  },
  {
    m: "bl",
    t: "STP",
    d: "Spanning Tree Protocol: evita loops bloqueando portas redundantes, que ficam como backup.",
    a: "Cones fechando uma estrada reserva.",
  },
  {
    m: "bl",
    t: "Broadcast storm",
    d: "Broadcast circulando infinitamente em loop: CPU a 100% e rede parada.",
    a: "Microfonia que só aumenta.",
  },
  {
    m: "bl",
    t: "Root Bridge",
    d: "Switch raiz, referência do STP. Todas as suas portas ficam em Forwarding.",
    a: "A prefeitura de onde partem todas as rotas.",
  },
  {
    m: "bl",
    t: "Bridge ID",
    d: "Prioridade + MAC. O menor vence a eleição. Prioridade padrão: 32768.",
    a: "Senha de fila: o menor número é chamado primeiro.",
  },
  {
    m: "bl",
    t: "Estados STP",
    d: "Blocking → Listening → Learning → Forwarding.",
    a: "Fica quieto, escuta, aprende, trabalha.",
  },
  {
    m: "br",
    t: "Firewall stateful",
    d: "Rastreia o estado das conexões. Mais seguro.",
    a: "Porteiro que lembra quem foi chamado por um morador.",
  },
  {
    m: "br",
    t: "Firewall stateless",
    d: "Analisa cada pacote isoladamente, sem contexto. Mais simples, menos seguro.",
    a: "Porteiro sem memória que só olha o crachá.",
  },
  {
    m: "br",
    t: "Deny all",
    d: "Regra no fim da lista que bloqueia tudo que não foi explicitamente permitido.",
    a: '"Quem não está na lista não entra."',
  },
  {
    m: "br",
    t: "DMZ",
    d: "Zona intermediária entre internet e rede interna, para servidores públicos.",
    a: "A recepção do hotel.",
  },
  {
    m: "br",
    t: "Menor privilégio",
    d: "Liberar só o acesso estritamente necessário.",
    a: "Crachá que abre só as portas que você usa.",
  },
  {
    m: "br",
    t: "Defesa em profundidade",
    d: "Várias camadas de proteção (ex.: VLAN + firewall) para que uma cubra a falha da outra.",
    a: "Portaria, catraca, porta com crachá e cofre.",
  },
  {
    m: "br",
    t: "ACL padrão",
    d: "Filtra só por IP de origem. Aplicada perto do destino.",
    a: "Blitz que só pergunta de onde você veio.",
  },
  {
    m: "br",
    t: "ACL estendida",
    d: "Filtra por IP origem/destino, porta e protocolo. Aplicada perto da origem.",
    a: "Blitz completa: origem, destino e motivo.",
  },
  {
    m: "br",
    t: "IDS",
    d: "Intrusion Detection System: detecta e alerta. Passivo, não bloqueia.",
    a: "Alarme da casa.",
  },
  {
    m: "br",
    t: "IPS",
    d: "Intrusion Prevention System: detecta e bloqueia em tempo real. Ativo.",
    a: "Segurança que impede a entrada.",
  },
  {
    m: "br",
    t: "SIEM",
    d: "Coleta e correlaciona logs de vários sistemas para análise centralizada.",
    a: "Central de monitoramento de câmeras.",
  },
  {
    m: "br",
    t: "802.1X",
    d: "Autenticação de acesso à rede na camada de enlace, cabeada ou Wi-Fi: suplicante, autenticador (switch) e RADIUS.",
    a: "Balada com lista VIP conferida pelo rádio.",
  },
  {
    m: "br",
    t: "AAA",
    d: "Autenticação (quem é), Autorização (o que pode) e Auditoria (o que fez).",
    a: "Documento, pulseira de acesso e câmera registrando.",
  },
  {
    m: "br",
    t: "VLAN hopping",
    d: "Ataque com tag 802.1Q dupla para acessar VLANs não autorizadas via trunk mal configurado.",
    a: "Penetra com duas pulseiras.",
  },
  {
    m: "br",
    t: "STP spoofing",
    d: "Atacante anuncia prioridade menor, vira Root Bridge e intercepta o tráfego.",
    a: "Alguém fingindo ser a prefeitura para desviar o trânsito.",
  },
];

/* ---------------------------------------------------------
   AUXILIARES
   --------------------------------------------------------- */

// nome do módulo a partir do código de cor
const MODN = { or: "Módulo 1", gr: "Módulo 2", bl: "Módulo 3", br: "Módulo 4" };

// monta um <svg> que usa um ícone do sprite que está no html
const ico = (n, c = "i") =>
  `<svg class="${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

const letters = "ABCD";

// wrapper do localStorage. tem try/catch porque em modo anônimo
// ou com o storage bloqueado ele lança erro
const store = {
  get(k, d) {
    try {
      const v = localStorage.getItem("rs_" + k);
      return v ? JSON.parse(v) : d;
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem("rs_" + k, JSON.stringify(v));
    } catch (e) {}
  },
};

/* ---------------------------------------------------------
   TEMA CLARO / ESCURO
   --------------------------------------------------------- */
const root = document.documentElement,
  mq = matchMedia("(prefers-color-scheme: dark)");

// se a pessoa escolheu no botão, vale a escolha; senão segue o sistema
const isDark = () =>
  root.dataset.theme ? root.dataset.theme === "dark" : mq.matches;

// data-dark só serve pro css decidir qual ícone mostrar (lua ou sol)
const syncDark = () => {
  root.dataset.dark = isDark() ? "1" : "0";
};

const savedTheme = store.get("theme", null);
if (savedTheme) root.dataset.theme = savedTheme;
syncDark();
mq.addEventListener?.("change", syncDark);

document.getElementById("themeBtn").onclick = () => {
  root.dataset.theme = isDark() ? "light" : "dark";
  store.set("theme", root.dataset.theme);
  syncDark();
};

/* ---------------------------------------------------------
   ABAS
   --------------------------------------------------------- */
const tabs = [...document.querySelectorAll(".tab")];

function showTab(id) {
  tabs.forEach((t) => t.setAttribute("aria-selected", t.dataset.p === id));
  document.querySelectorAll(".panel").forEach((p) => (p.hidden = p.id !== id));
  window.scrollTo({ top: 0 });
  updateRead();
}
tabs.forEach((t) => t.addEventListener("click", () => showTab(t.dataset.p)));

// botões do fim do conteúdo (data-go) também trocam de aba
document
  .querySelectorAll("[data-go]")
  .forEach((b) => (b.onclick = () => showTab(b.dataset.go)));

/* ---------------------------------------------------------
   BARRA DE LEITURA (fininha, embaixo das abas)
   --------------------------------------------------------- */
const rb = document.getElementById("readbar");

function updateRead() {
  const h = document.documentElement.scrollHeight - innerHeight;
  rb.style.width = (h > 0 ? Math.min(100, (scrollY / h) * 100) : 0) + "%";
}
addEventListener("scroll", updateRead, { passive: true });

/* ---------------------------------------------------------
   TÓPICOS "ESTUDADOS"
   --------------------------------------------------------- */
const studied = store.get("studied", {}); // { indiceDoTopico: true }
const topics = [...document.querySelectorAll(".topic")];

// atualiza o "2/4" que aparece ao lado de cada módulo no índice
function modProgress() {
  document.querySelectorAll(".index .prog").forEach((p) => {
    const m = p.dataset.mod,
      list = topics.filter((t) => t.closest(".module").id === "m" + m);
    const d = list.filter((t) => studied[topics.indexOf(t)]).length;
    p.textContent = `${d}/${list.length}`;
  });
}

// cria um botão no final de cada tópico
topics.forEach((t, i) => {
  const b = document.createElement("button");
  b.className = "done-btn";
  const set = () => {
    b.setAttribute("aria-pressed", !!studied[i]);
    b.innerHTML = studied[i]
      ? ico("checkc") + "Estudado"
      : ico("checkc") + "Marcar como estudado";
  };
  b.onclick = () => {
    studied[i] = !studied[i];
    store.set("studied", studied);
    set();
    modProgress();
  };
  set();
  t.appendChild(b);
});
modProgress();

/* ---------------------------------------------------------
   QUESTÕES E V OU F
   as duas abas usam a mesma função de render, o parâmetro k
   diz qual é: 'q' = questões, 'v' = verdadeiro/falso
   --------------------------------------------------------- */
const state = { q: store.get("q", {}), v: store.get("v", {}) }; // respostas salvas
const filt = { q: "all", v: "all" }; // filtro ativo de cada aba

// atualiza placar, barra de progresso e o cartão de resultado
function stats(k) {
  const data = k === "q" ? Q : V,
    st = state[k];
  const ok = Object.values(st).filter((x) => x.ok).length,
    done = Object.keys(st).length;

  document.getElementById(k + "Ok").textContent = ok;
  document.getElementById(k + "Bad").textContent = done - ok;
  document.getElementById(k + "Left").textContent = data.length - done;
  document.getElementById(k + "Prog").style.width =
    (done / data.length) * 100 + "%";
  document.getElementById(k === "q" ? "nQ" : "nV").textContent =
    `${done}/${data.length}`;

  // o resultado final só aparece quando respondeu tudo e está vendo "Todas"
  const r = document.getElementById(k + "Result");
  if (done === data.length && filt[k] === "all") {
    const pct = Math.round((ok / data.length) * 100);
    const wrong = Object.entries(st)
      .filter(([, x]) => !x.ok)
      .map(([i]) => +i + 1);
    const msg =
      pct >= 85
        ? "Mandou muito bem!"
        : pct >= 60
          ? "Bom caminho. Revise os pontos que errou."
          : "Vale reler o conteúdo e tentar de novo.";
    r.innerHTML = `${ico("trophy")}<div class="big">${pct}%</div><p><b style="color:var(--ink)">${msg}</b></p><p>${ok} de ${data.length} certas.${wrong.length ? ` Errou: ${wrong.join(", ")}. Use o filtro "Só as que errei".` : ""}</p>`;
    r.classList.add("show");
  } else r.classList.remove("show");
}

// desenha a lista (respeitando o filtro) e liga os cliques
function render(k) {
  const data = k === "q" ? Q : V,
    box = document.getElementById(k + "List"),
    st = state[k];
  box.innerHTML = "";
  let shown = 0;

  data.forEach((q, i) => {
    const f = filt[k];
    // pula o que não bate com o filtro
    if (f === "wrong" ? !(st[i] && !st[i].ok) : f !== "all" && q.m !== f)
      return;
    shown++;

    const el = document.createElement("div");
    el.className = "q";

    // questão = 4 alternativas; v/f = dois botões
    const body =
      k === "q"
        ? `<div class="opts">${q.o.map((o, j) => `<button class="opt" data-j="${j}"><span class="l">${letters[j]}</span><span>${o}</span></button>`).join("")}</div>`
        : `<div class="vf"><button class="opt" data-j="1">Verdadeiro</button><button class="opt" data-j="0">Falso</button></div>`;

    // no v/f o "índice" da certa é 1 (verdadeiro) ou 0 (falso)
    const correct = k === "q" ? q.a : q.a ? 1 : 0;
    const ansTxt =
      k === "q" ? `${letters[q.a]}) ${q.o[q.a]}` : q.a ? "Verdadeiro" : "Falso";

    el.innerHTML = `<div class="qtop"><span>${k === "q" ? "Questão" : "Afirmação"} ${i + 1}</span><span>${MODN[q.m]}</span></div><div class="stem">${q.s}</div>${body}<div class="verdict"></div><details class="ans"><summary>${ico("right")}Ver resposta</summary><div class="exp">Resposta: <b class="k">${ansTxt}</b><br>${q.e}</div></details>`;

    const btns = [...el.querySelectorAll(".opt")],
      det = el.querySelector("details"),
      ver = el.querySelector(".verdict");

    // trava os botões, pinta certo/errado e abre a explicação
    const lock = (j) => {
      btns.forEach((x) => {
        x.disabled = true;
        const jj = +x.dataset.j;
        if (jj === correct) {
          x.classList.add("right");
          if (k === "q") x.querySelector(".l").innerHTML = ico("check");
        } else if (jj !== j) x.classList.add("fade");
      });
      const ok = j === correct;
      if (!ok) {
        const w = btns.find((x) => +x.dataset.j === j);
        w.classList.add("wrong");
        if (k === "q") w.querySelector(".l").innerHTML = ico("x");
      }
      ver.className = "verdict " + (ok ? "ok" : "no");
      ver.innerHTML = ok
        ? ico("checkc") + "Acertou!"
        : ico("alert") + "Não foi dessa vez.";
      det.open = true;
    };

    // se já respondeu antes, restaura o estado (menos no filtro "só as que errei",
    // onde a ideia é tentar de novo)
    if (st[i] && f !== "wrong") lock(st[i].j);

    btns.forEach((b) =>
      b.addEventListener("click", () => {
        const j = +b.dataset.j;
        lock(j);
        state[k][i] = { j, ok: j === correct };
        store.set(k, state[k]);
        stats(k);
      }),
    );

    box.appendChild(el);
  });

  if (!shown)
    box.innerHTML =
      '<div class="empty">Nada por aqui. Se escolheu "Só as que errei", é porque você ainda não errou nenhuma.</div>';
  stats(k);
}

// chips de filtro (módulo 1..4, "só as que errei")
document.querySelectorAll(".tools[data-filter]").forEach((t) => {
  const k = t.dataset.filter;
  t.querySelectorAll("[data-f]").forEach((b) =>
    b.addEventListener("click", () => {
      t.querySelectorAll("[data-f]").forEach((x) =>
        x.setAttribute("aria-pressed", x === b),
      );
      filt[k] = b.dataset.f;
      render(k);
    }),
  );
});

// botão "refazer": zera as respostas daquela aba
document.querySelectorAll("[data-reset]").forEach((b) =>
  b.addEventListener("click", () => {
    const k = b.dataset.reset;
    state[k] = {};
    store.set(k, {});
    render(k);
  }),
);

render("q");
render("v");

/* ---------------------------------------------------------
   FLASHCARDS
   --------------------------------------------------------- */
const known = store.get("known", {}); // { indice: true (já sei) | false (revisar) }
let mode = "all",
  deck = [],
  idx = 0; // filtro atual, cartões visíveis, posição
const fc = document.getElementById("fc"),
  $ = (id) => document.getElementById(id);

// monta o baralho conforme o filtro e volta pro primeiro cartão
function buildDeck() {
  deck = F.map((c, i) => ({ ...c, i })).filter((c) =>
    mode === "all"
      ? true
      : mode === "review"
        ? known[c.i] === false
        : c.m === mode,
  );
  idx = 0;
  showCard();
}

function fstats() {
  const v = Object.values(known),
    y = v.filter((x) => x === true).length;
  $("fYes").textContent = y;
  $("fNo").textContent = v.filter((x) => x === false).length;
  $("fTot").textContent = F.length;
  $("nF").textContent = `${y}/${F.length}`;
}

function showCard() {
  fstats();
  fc.classList.remove("flip"); // sempre começa mostrando a frente

  // baralho vazio (ex.: filtro "revisar" sem nada marcado)
  if (!deck.length) {
    $("fcTag").textContent = "";
    $("fcCount2").textContent = "";
    $("fcTerm").textContent = "Nenhum cartão aqui";
    $("fcDef").textContent = "";
    $("fcAna").textContent = "";
    $("fcCount").textContent = "0 / 0";
    return;
  }

  const c = deck[idx],
    s = known[c.i];
  $("fcTag").textContent = MODN[c.m];
  $("fcCount2").textContent =
    s === true ? "já sei" : s === false ? "revisar" : "";
  $("fcTerm").textContent = c.t;
  $("fcDef").textContent = c.d;
  $("fcAna").textContent = c.a;
  $("fcCount").textContent = `${idx + 1} / ${deck.length}`;
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

fc.addEventListener("click", () => fc.classList.toggle("flip"));
$("fcNext").onclick = next;
$("fcPrev").onclick = prev;

// "já sei" / "revisar". No filtro "só revisar", o cartão que
// você marcou como sabido sai do baralho na hora
const judge = (v) => {
  if (!deck.length) return;
  known[deck[idx].i] = v;
  store.set("known", known);
  if (mode === "review" && v) {
    deck.splice(idx, 1);
    if (idx >= deck.length) idx = 0;
    showCard();
  } else next();
};
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

// filtro por módulo
document.querySelectorAll("#fcFilter [data-m]").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll("#fcFilter [data-m]")
      .forEach((x) => x.setAttribute("aria-pressed", x === b));
    mode = b.dataset.m;
    buildDeck();
  }),
);

// atalhos de teclado (só funcionam com a aba de cards aberta)
document.addEventListener("keydown", (e) => {
  if ($("flash").hidden) return;
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
  if (e.key === " " && e.target === document.body) {
    e.preventDefault();
    fc.classList.toggle("flip");
  }
});

buildDeck();
