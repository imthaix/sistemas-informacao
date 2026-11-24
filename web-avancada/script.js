/* Dados do guia: edite aqui para ajustar o conteúdo */
const steps = [
  [
    "Navegador",
    "O usuário digita <b>/produtos/</b>. O navegador envia uma <b>requisição HTTP</b> ao servidor. Python nunca roda no navegador.",
    "GET /produtos/ HTTP/1.1",
  ],
  [
    "urls.py",
    "O Django percorre as rotas <b>de cima para baixo</b> e usa a primeira que casar. Se nenhuma casar: <b>erro 404</b>.",
    "path('produtos/', views.lista, name='lista')",
  ],
  [
    "views.py",
    "A <b>View</b> é a lógica: decide o que buscar e qual template usar. (No MVC isso seria o Controller.)",
    "def lista(request):\n    produtos = Produto.objects.all()",
  ],
  [
    "models.py + Banco",
    "O <b>Model</b> usa o ORM para falar com o banco sem SQL escrito à mão e devolve os dados.",
    "SELECT * FROM produtos_produto;  -- gerado pelo ORM",
  ],
  [
    "Template",
    "O <b>Template</b> é a apresentação: HTML com <code>{{ }}</code> e <code>{% %}</code>. Não busca dados nem decide regras.",
    "{% for p in produtos %}<li>{{ p.nome }}</li>{% endfor %}",
  ],
  [
    "Resposta",
    "A view devolve um <b>HttpResponse</b> com o HTML pronto, e o navegador exibe a página.",
    "return render(request, 'lista.html', {'produtos': produtos})",
  ],
];
const road = [
  [
    "T1 · POO em Python",
    "classe, objeto, __init__, self, herança, super(), atributo de classe × instância",
  ],
  [
    "T2 · O Django",
    "MTV, startproject × startapp, manage.py, settings.py, urls.py, ciclo da requisição",
  ],
  ["T3 · Modelos", "campos, ForeignKey, migrations, ORM: all, filter, get"],
  [
    "T4 · Formulários e templates",
    "DTL, extends/block, Form × ModelForm, is_valid, csrf_token",
  ],
  [
    "T5 · Django Admin",
    "createsuperuser, register, ModelAdmin, list_display, search_fields",
  ],
  [
    "T6 · Loja virtual",
    "categorias, produtos, carrinho, views, templates, urls, admin juntos",
  ],
  ["Quiz", "acertar 18 de 20 sem consultar"],
  ["Prova", "revisar a cola e dormir bem"],
];
const T = [
  {
    t: "Tópico 01 · POO em Python",
    p: [
      "<b>Classe</b> é o molde; <b>objeto</b> (instância) é o que nasce dele.",
      "<code>__init__</code> é o <b>inicializador</b>: garante que o objeto nasça com estado mínimo consistente. (Quem cria o objeto é o <code>__new__</code>.)",
      "<code>self</code> é a própria instância.",
      "Atributo definido no <b>corpo da classe</b> é de classe: compartilhado por todas as instâncias. Atributo em <code>self.x</code> é de instância. Cuidado com listas mutáveis em atributo de classe.",
      "<b>Herança</b>: <code>class Carro(Veiculo)</code>. <code>super().__init__()</code> chama o construtor do pai para a base ser inicializada.",
      "<b>Polimorfismo</b>: mesmo método, comportamentos diferentes. <b>Encapsulamento</b>: <code>_x</code> por convenção, <code>__x</code> com name mangling.",
      "Dicionário solto não tem <b>contrato</b> (pode faltar o preço); a classe exige os atributos na criação.",
      "Maestria em POO é <b>design</b>: saber quando um objeto cuida da tarefa e quando delega.",
    ],
    c: "class Veiculo:\n    rodas = 4                 # atributo de classe\n    def __init__(self, marca):\n        self.marca = marca    # atributo de instância\n\nclass Carro(Veiculo):\n    def __init__(self, marca, portas):\n        super().__init__(marca)\n        self.portas = portas",
    e: "O Django inteiro é feito de classes (Model, Form, View). Responsabilidade única evita sistemas em que mexer em um ponto quebra dez.",
  },
  {
    t: "Tópico 02 · O Django framework",
    p: [
      "<b>MTV</b>: Model (dados), Template (apresentação), View (lógica). A View do Django equivale ao Controller do MVC.",
      "<code>startproject</code> cria <b>o projeto</b> (um só). <code>startapp</code> cria <b>um app</b> (vários). Todo app precisa estar em <code>INSTALLED_APPS</code>.",
      "<code>manage.py</code> <b>executa</b> comandos. <code>settings.py</code> <b>configura</b>. <code>urls.py</code> <b>roteia</b>. <code>views.py</code> <b>processa</b>.",
      "Ciclo: URL → <code>urls.py</code> (de cima para baixo, primeiro que casar) → view → resposta. Sem rota: <b>404</b>.",
      "<code>runserver</code> é só para desenvolvimento; produção usa Gunicorn + Nginx.",
    ],
    c: "loja_virtual/\n├── manage.py\n├── loja_virtual/\n│   ├── settings.py\n│   ├── urls.py\n│   └── wsgi.py\n└── produtos/        # app\n    ├── models.py\n    ├── views.py\n    └── urls.py",
    e: "Padronização: qualquer dev Django abre o projeto e sabe onde está cada coisa. Em produção: DEBUG=False, SECRET_KEY fora do repositório, ALLOWED_HOSTS preenchido.",
  },
  {
    t: "Tópico 03 · Modelos",
    p: [
      "Model é uma classe que herda <code>models.Model</code>. <b>Classe = tabela, atributo = coluna, instância = linha</b>.",
      "Campos: <code>CharField</code> (exige <code>max_length</code>), <code>TextField</code>, <code>IntegerField</code>, <code>DecimalField</code> (dinheiro), <code>BooleanField</code>, <code>DateTimeField</code>, <code>ImageField</code>.",
      "Relações: <code>ForeignKey</code> (1:N, exige <code>on_delete</code>), <code>ManyToManyField</code> (N:N), <code>OneToOneField</code> (1:1).",
      "<b>Migrations</b>: <code>makemigrations</code> gera o arquivo, <code>migrate</code> aplica no banco. Sempre nessa ordem.",
      "ORM: <code>all()</code> e <code>filter()</code> devolvem QuerySet (vários). <code>get()</code> devolve <b>um</b> objeto (erro se 0 ou mais de 1). Também <code>exclude()</code>, <code>order_by()</code>, <code>create()</code>, <code>save()</code>, <code>delete()</code>.",
      "Lookups: <code>nome__icontains</code>, <code>preco__gte</code>. Defina <code>__str__</code> para nomes legíveis.",
    ],
    c: "class Categoria(models.Model):\n    nome = models.CharField(max_length=80)\n    def __str__(self): return self.nome\n\nclass Produto(models.Model):\n    nome = models.CharField(max_length=100)\n    preco = models.DecimalField(max_digits=8, decimal_places=2)\n    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)",
    e: "O ORM protege contra SQL injection e permite trocar SQLite por PostgreSQL mexendo só em DATABASES. Migrations versionam o banco junto com o código.",
  },
  {
    t: "Tópico 04 · Formulários e templates",
    p: [
      "<code>{{ variavel }}</code> <b>exibe</b> valor. <code>{% tag %}</code> executa <b>lógica de apresentação</b> (for, if, url, extends, block).",
      "<b>Herança de templates</b>: <code>base.html</code> define <code>{% block content %}</code>; os filhos usam <code>{% extends 'base.html' %}</code>. Cabeçalho e rodapé escritos uma vez.",
      "<code>forms.Form</code> declara campos à mão. <code>ModelForm</code> <b>gera os campos a partir do model</b> (<code>class Meta: model, fields</code>).",
      "Fluxo: GET mostra o formulário vazio. POST valida com <code>is_valid()</code>, salva e faz <code>redirect</code>. Dados limpos em <code>cleaned_data</code>, erros em <code>form.errors</code>.",
      "<code>{% csrf_token %}</code> é obrigatório em formulários POST (proteção contra CSRF). O Django escapa <code>{{ }}</code> automaticamente (proteção contra XSS).",
    ],
    c: "class ProdutoForm(forms.ModelForm):\n    class Meta:\n        model = Produto\n        fields = ['nome', 'preco', 'categoria']\n\ndef novo(request):\n    form = ProdutoForm(request.POST or None)\n    if form.is_valid():\n        form.save()\n        return redirect('lista')\n    return render(request, 'form.html', {'form': form})",
    e: "Validação e proteção contra ataques são obrigatórias. Formulário mal feito é porta de entrada para falhas de segurança.",
  },
  {
    t: "Tópico 05 · Django Admin",
    p: [
      "Painel administrativo <b>pronto</b>, acessado em <code>/admin/</code>. Primeiro crie o usuário com <code>createsuperuser</code>.",
      "Para aparecer no admin, o model precisa ser registrado: <code>admin.site.register(Produto)</code> ou <code>@admin.register(Produto)</code>.",
      "<code>ModelAdmin</code> personaliza: <code>list_display</code> (colunas), <code>search_fields</code> (busca), <code>list_filter</code> (filtros laterais), <code>list_editable</code>, <code>ordering</code>, <code>readonly_fields</code>.",
      "<code>inlines</code> (TabularInline) edita itens relacionados na mesma tela, como ItemPedido dentro de Pedido.",
      "O admin é para a <b>equipe interna</b>, não para o cliente final.",
    ],
    c: "@admin.register(Produto)\nclass ProdutoAdmin(admin.ModelAdmin):\n    list_display = ('nome', 'preco', 'categoria')\n    search_fields = ('nome',)\n    list_filter = ('categoria',)",
    e: "Vira painel interno pronto para a operação cadastrar e consultar dados, economizando semanas de desenvolvimento.",
  },
  {
    t: "Tópico 06 · Loja virtual completa",
    p: [
      "Divida em apps: <code>produtos</code>, <code>carrinho</code>, <code>pedidos</code>. Models típicos: Categoria, Produto (FK), Pedido, ItemPedido.",
      "Ordem de construção: models → <code>makemigrations</code> + <code>migrate</code> → registrar no admin e cadastrar dados → views → templates → urls (com <code>include()</code>).",
      "Detalhe de produto: use <code>get_object_or_404</code> para devolver 404 em vez de erro 500.",
      "Carrinho: pode ficar na <b>sessão</b> (<code>request.session</code>) ou em um model.",
      "Imagens enviadas: <code>MEDIA_ROOT</code> e <code>MEDIA_URL</code>. CSS/JS: <code>{% load static %}</code>.",
      "Erros comuns: app fora de INSTALLED_APPS, esquecer migrate, esquecer csrf_token, rota sem <code>name</code>.",
    ],
    c: "def detalhe(request, id):\n    produto = get_object_or_404(Produto, id=id)\n    return render(request, 'produtos/detalhe.html',\n                  {'produto': produto})\n\n# urls.py\npath('produtos/<int:id>/', views.detalhe, name='detalhe')",
    e: "Mostra se você entendeu como as peças se conectam. É o tipo de projeto que aparece em portfólio e entrevistas.",
  },
];
const C = [
  ["Cria a estrutura base do projeto", "startproject"],
  ["Cria um app dentro do projeto", "startapp"],
  ["Sobe o servidor local", "manage.py runserver"],
  ["Sincroniza models com o banco", "makemigrations + migrate"],
  ["INSTALLED_APPS, DATABASES, DEBUG", "settings.py"],
  ["Rotas, mapeia URL para função", "urls.py"],
  ["Lógica, decide o que buscar", "View (views.py)"],
  ["Apresentação, HTML, como exibir", "Template"],
  ["Tabelas, banco, ORM", "Model (models.py)"],
  ["Contrato, atributos obrigatórios", "Classe (POO), não dicionário"],
  ["Inicializador, estado mínimo", "__init__"],
  ["Construtor do pai na herança", "super().__init__()"],
  ["Compartilhado por todas as instâncias", "Atributo de classe"],
  ["Quando delegar tarefas", "Design orientado a objetos"],
  ["Página não encontrada, 404", "Nenhuma rota casou no urls.py"],
  ["Formulário gerado a partir do model", "ModelForm"],
  ["Proteção contra CSRF", "{% csrf_token %}"],
  ["Reaproveitar cabeçalho e rodapé", "extends + block"],
  ["Painel administrativo pronto", "Django Admin + register"],
  ["Colunas na lista do admin", "list_display"],
  ["Campo de busca no admin", "search_fields"],
  ["Relacionamento 1 para N", "ForeignKey"],
  ["Um único objeto", "get()"],
  ["Vários objetos, filtro", "filter() / all()"],
  ["Senhas dos usuários", "Hash no banco, nunca no settings"],
  ["Navegador executa Python?", "Sempre falso"],
  ["Banco escolhe o template?", "Sempre falso, é a view"],
  ["Produção", "DEBUG=False, Gunicorn + Nginx"],
];
const Q = [
  [
    "A maestria em POO vem de qual habilidade?",
    [
      "Memorizar palavras-chave",
      "Saber quando um objeto cuida da tarefa e quando delega",
      "Escrever menos linhas possível",
      "Evitar herança",
    ],
    1,
    "Design e responsabilidade única. Sintaxe se aprende rápido.",
  ],
  [
    "Principal deficiência do dicionário solto frente à POO?",
    [
      "Usa mais RAM",
      "Falta de contrato que garanta os atributos (ex.: preço)",
      "É lento",
      "Não pode ser argumento",
    ],
    1,
    "A classe exige os atributos no __init__; o dicionário aceita qualquer coisa.",
  ],
  [
    "Função de super().__init__() na classe filha?",
    [
      "Cria cópia do pai",
      "Invoca o construtor do pai para inicializar a base",
      "Encerra a execução",
      "Dá prioridade à filha no MRO",
    ],
    1,
    "A filha sobrescreve o __init__; sem super(), a parte do pai não é inicializada.",
  ],
  [
    "Função do método __init__?",
    [
      "Coletor de lixo",
      "Inicializador: o objeto nasce com estado mínimo consistente",
      "Verificar sintaxe",
      "Ignorar métodos do pai",
    ],
    1,
    "Coletor de lixo se parece com __del__. O __init__ só inicializa.",
  ],
  [
    "Atributo definido no corpo da classe, fora do __init__, é...",
    [
      "Erro",
      "Atributo de classe, compartilhado",
      "Temporário",
      "Constante read-only",
    ],
    1,
    "Pertence à classe e é visto por todas as instâncias.",
  ],
  [
    "O que faz django-admin startproject?",
    [
      "Sobe o servidor",
      "Instala o Django",
      "Cria a estrutura base do projeto",
      "Aplica migrações",
    ],
    2,
    "Servidor é runserver; app é startapp; migrações são migrate.",
  ],
  [
    "Tarefa típica do manage.py?",
    [
      "Definir campos de tabela",
      "Executar runserver",
      "Escrever CSS",
      "Guardar chaves de API",
    ],
    1,
    "manage.py executa; settings.py configura; models.py define campos.",
  ],
  [
    "Responsabilidade da camada Template?",
    [
      "Mapear URLs",
      "Lógica de negócio",
      "Apresentação em HTML",
      "Banco de dados",
    ],
    2,
    "URLs são do urls.py, lógica é da View, banco é do Model.",
  ],
  [
    "Função primordial do settings.py?",
    [
      "Definir rotas",
      "Guardar senhas dos usuários",
      "Centralizar configurações (INSTALLED_APPS, DATABASES)",
      "Conter as views",
    ],
    2,
    "Senhas ficam em hash no banco. Rotas ficam no urls.py.",
  ],
  [
    "O que acontece quando uma URL é acessada?",
    [
      "Cria tabela de histórico",
      "Navegador executa Python",
      "Django percorre urls.py e chama a View correspondente",
      "O banco escolhe o template",
    ],
    2,
    "Sem padrão que case, o resultado é 404.",
  ],
  [
    "Qual comando aplica as migrações no banco?",
    ["makemigrations", "migrate", "runserver", "startapp"],
    1,
    "makemigrations só gera os arquivos. migrate aplica.",
  ],
  [
    "Qual campo exige o argumento max_length?",
    ["TextField", "IntegerField", "CharField", "BooleanField"],
    2,
    "CharField precisa de max_length. TextField não.",
  ],
  [
    "Qual campo cria uma relação 1 para N?",
    ["OneToOneField", "ForeignKey", "ManyToManyField", "ImageField"],
    1,
    "A ForeignKey fica no lado 'muitos' (Produto aponta para Categoria).",
  ],
  [
    "Qual método do ORM retorna exatamente um objeto?",
    ["filter()", "all()", "get()", "exclude()"],
    2,
    "get() levanta erro se houver 0 ou mais de 1 resultado.",
  ],
  [
    "Para que serve {% csrf_token %}?",
    [
      "Estilizar o formulário",
      "Proteger contra CSRF em formulários POST",
      "Carregar arquivos estáticos",
      "Herdar template",
    ],
    1,
    "Sem ele, o Django rejeita o POST com erro 403.",
  ],
  [
    "Qual tag faz um template herdar de outro?",
    ["{% include %}", "{% extends %}", "{% load %}", "{% url %}"],
    1,
    "extends no filho; block define as áreas substituíveis.",
  ],
  [
    "Diferença entre Form e ModelForm?",
    [
      "Nenhuma",
      "ModelForm gera os campos a partir de um model",
      "Form só funciona com GET",
      "ModelForm não valida",
    ],
    1,
    "ModelForm usa class Meta com model e fields.",
  ],
  [
    "Como exibir um model no Django Admin?",
    [
      "admin.site.register(Model)",
      "migrate --admin",
      "startadmin",
      "Editar settings.py",
    ],
    0,
    "Também vale o decorador @admin.register(Model).",
  ],
  [
    "Qual atributo do ModelAdmin define as colunas da lista?",
    ["search_fields", "list_filter", "list_display", "ordering"],
    2,
    "search_fields é a busca; list_filter são os filtros laterais.",
  ],
  [
    "Para que usar get_object_or_404?",
    [
      "Criar objetos",
      "Devolver 404 quando o objeto não existe, em vez de erro 500",
      "Deletar objetos",
      "Filtrar vários",
    ],
    1,
    "Evita expor erro interno ao usuário.",
  ],
];

/* Lógica compartilhada e de cada página (os dados ficam em data.js) */
const $ = (s) => document.querySelector(s),
  esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const store = {
  get(k, d) {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  },
};
const links = [
  ["#inicio", "🏠", "Início"],
  ["#fluxo", "🔀", "Fluxo"],
  ["#resumos", "📚", "Resumos"],
  ["#cola", "⚡", "Cola"],
  ["#quiz", "🧠", "Quiz"],
  ["#comandos", "⌨️", "Comandos"],
];

/* ---- Topo e tema ---- */
(function () {
  const t = store.get("theme", null);
  if (t) document.documentElement.dataset.theme = t;
  $("#topbar").innerHTML =
    `<a class="brand" href="index.html">Django sem mistério</a><nav>${links.map((l) => `<a href="${l[0]}"><span>${l[1]}</span>${l[2]}</a>`).join("")}</nav><button id="tm" aria-label="Alternar tema claro/escuro">◐</button>`;
  $("#tm").onclick = () => {
    const dark =
      (document.documentElement.dataset.theme ||
        (matchMedia("(prefers-color-scheme:dark)").matches
          ? "dark"
          : "light")) == "dark";
    const n = dark ? "light" : "dark";
    document.documentElement.dataset.theme = n;
    store.set("theme", n);
  };
})();

const pages = {
  /* ---- Início ---- */
  index() {
    const rd = $("#road");
    let done = store.get("done", []);
    road.forEach((r, i) =>
      rd.insertAdjacentHTML(
        "beforeend",
        `<li><input type="checkbox" id="r${i}" ${done.includes(i) ? "checked" : ""}><label for="r${i}"><b>${r[0]}</b><small>${r[1]}</small></label></li>`,
      ),
    );
    const prog = () => {
      done = [...rd.querySelectorAll("input")].flatMap((c, i) =>
        c.checked ? [i] : [],
      );
      store.set("done", done);
      $("#pbar").style.width = (done.length / road.length) * 100 + "%";
    };
    rd.onchange = prog;
    prog();
    const b = store.get("best", null);
    $("#best").textContent = b !== null ? `Melhor: ${b}/${Q.length}` : "";
  },

  /* ---- Fluxo animado ---- */
  fluxo() {
    const fl = $("#flow");
    let cur = 0,
      timer;
    steps.forEach((s, i) =>
      fl.insertAdjacentHTML(
        "beforeend",
        (i ? '<span class="arr" aria-hidden="true">→</span>' : "") +
          `<button class="node" data-i="${i}">${s[0]}</button>`,
      ),
    );
    const show = (i) => {
      cur = i;
      fl.querySelectorAll(".node").forEach((n, k) =>
        n.classList.toggle("on", k == i),
      );
      fl.querySelectorAll(".arr").forEach((a, k) =>
        a.classList.toggle("on", k == i - 1),
      );
      $("#panel").innerHTML =
        `<h3>${steps[i][0]}</h3><p>${steps[i][1]}</p><pre><code>${esc(steps[i][2])}</code></pre>`;
    };
    const play = () => {
      clearInterval(timer);
      show(0);
      timer = setInterval(() => show((cur + 1) % steps.length), 3200);
    };
    fl.onclick = (e) => {
      const b = e.target.closest(".node");
      if (b) {
        clearInterval(timer);
        show(+b.dataset.i);
      }
    };
    $("#play").onclick = play;
    show(0);
    if (!matchMedia("(prefers-reduced-motion:reduce)").matches) play();
  },

  /* ---- Resumos ---- */
  resumos() {
    const tabs = $("#tabs");
    T.forEach((x, i) =>
      tabs.insertAdjacentHTML(
        "beforeend",
        `<button class="tab" role="tab" data-i="${i}">${x.t.split(" · ")[0].replace("Tópico 0", "T")}</button>`,
      ),
    );
    const open = (i) => {
      const x = T[i];
      tabs
        .querySelectorAll(".tab")
        .forEach((b, k) => b.setAttribute("aria-selected", k == i));
      $("#topic").innerHTML =
        `<h2 style="margin-top:.4em">${x.t}</h2><div class="grid">${x.p.map((l, k) => `<div class="card pt" style="animation-delay:${k * 70}ms">${l}</div>`).join("")}</div><pre><code>${esc(x.c)}</code><button class="cp">Copiar</button></pre><div class="emp"><b>Na empresa:</b> ${x.e}</div>`;
      $(".cp").onclick = (e) => {
        try {
          navigator.clipboard.writeText(x.c);
          e.target.textContent = "Copiado";
        } catch (_) {}
      };
    };
    tabs.onclick = (e) => {
      const b = e.target.closest(".tab");
      if (b) open(+b.dataset.i);
    };
    open(0);
  },

  /* ---- Cola ---- */
  cola() {
    const draw = (f) => {
      $("#colas").innerHTML =
        C.filter((c) => (c[0] + c[1]).toLowerCase().includes(f.toLowerCase()))
          .map(
            (c) =>
              `<div class="card cola"><span>${esc(c[0])}</span><b>${esc(c[1])}</b></div>`,
          )
          .join("") || "<p>Nada encontrado.</p>";
    };
    draw("");
    $("#q").oninput = (e) => draw(e.target.value);
  },

  /* ---- Quiz ---- */
  quiz() {
    let qi = 0,
      sc = 0,
      wrong = [];
    const qb = $("#quizbox");
    const ask = () => {
      if (qi >= Q.length) return end();
      const q = Q[qi];
      qb.innerHTML = `<p>Questão ${qi + 1} de ${Q.length} · Acertos: ${sc}</p><div class="bar"><i style="width:${(qi / Q.length) * 100}%"></i></div><h3>${esc(q[0])}</h3>${q[1].map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("")}<div id="fb"></div>`;
    };
    qb.onclick = (e) => {
      const b = e.target.closest(".opt"),
        n = e.target.closest("#nx"),
        r = e.target.closest("#rs");
      if (r) {
        qi = 0;
        sc = 0;
        wrong = [];
        return ask();
      }
      if (n) {
        qi++;
        return ask();
      }
      if (!b || b.disabled) return;
      const q = Q[qi],
        i = +b.dataset.i,
        ok = i == q[2];
      qb.querySelectorAll(".opt").forEach((o, k) => {
        o.disabled = true;
        if (k == q[2]) o.classList.add("ok");
      });
      if (ok) sc++;
      else {
        b.classList.add("no");
        wrong.push(qi);
      }
      $("#fb").innerHTML =
        `<div class="exp"><b>${ok ? "Correto." : "Não foi dessa vez."}</b> ${esc(q[3])}</div><button class="btn" id="nx">${qi + 1 < Q.length ? "Próxima" : "Ver resultado"}</button>`;
    };
    const end = () => {
      const best = Math.max(sc, store.get("best", 0));
      store.set("best", best);
      qb.innerHTML = `<h3>Você acertou ${sc} de ${Q.length}</h3><div class="bar"><i style="width:${(sc / Q.length) * 100}%"></i></div><p>Melhor resultado neste aparelho: ${best}.</p>${wrong.length ? "<h3>Para revisar</h3>" + wrong.map((k) => `<div class="rev"><b>${esc(Q[k][0])}</b><br>Resposta: ${esc(Q[k][1][Q[k][2]])}<br><small>${esc(Q[k][3])}</small></div>`).join("") : "<p>Perfeito! Agora é só descansar antes da prova.</p>"}<button class="btn" id="rs">Refazer</button>`;
    };
    ask();
  },
};
Object.values(pages).forEach((f) => f());

/* ---- Destaca no menu a seção que está na tela ---- */
const navLinks = [...document.querySelectorAll("nav a")];
const spy = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting)
        navLinks.forEach((a) =>
          a.toggleAttribute(
            "aria-current",
            a.getAttribute("href") == "#" + e.target.id,
          ),
        );
    }),
  { rootMargin: "-35% 0px -60% 0px" },
);
document.querySelectorAll(".sec").forEach((s) => spy.observe(s));
