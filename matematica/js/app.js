const PAGES = [
  ["index.html", "Início"],
  ["conjuntos.html", "Conjuntos"],
  ["contagem.html", "Contagem"],
  ["relacoes.html", "Relações"],
  ["funcoes.html", "Funções"],
  ["provas.html", "Provas"],
  ["quiz.html", "Quiz"],
  ["cola.html", "Cola rápida"],
  ["trilha.html", "Trilha"],
];
const here = location.pathname.split("/").pop() || "index.html";
document.body.insertAdjacentHTML(
  "afterbegin",
  `<header class="top"><a class="brand" href="index.html">Matemática para Computação</a><nav>${PAGES.map(([h, t]) => `<a href="${h}"${h === here ? ' aria-current="page"' : ""}>${t}</a>`).join("")}</nav></header>`,
);
const $ = (s, r = document) => r.querySelector(s);
const put = (id, html, cls = "") => {
  const e = $("#" + id);
  e.className = "out " + cls;
  e.innerHTML = html;
};
const nCr = (n, k) => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};
const fmt = (n) => n.toLocaleString("pt-BR");
const on = (id, fn) => {
  const b = $("#" + id);
  if (b) b.onclick = fn;
};
const v = (id) => Number($("#" + id).value) || 0;

on("ie-go", () => {
  const A = v("A"),
    B = v("B"),
    C = v("C"),
    AB = v("AB"),
    AC = v("AC"),
    BC = v("BC"),
    T = v("ABC");
  const a = A - AB - AC + T,
    b = B - AB - BC + T,
    c = C - AC - BC + T,
    u = A + B + C - AB - AC - BC + T;
  put(
    "ie-out",
    `Só A: ${a} · Só B: ${b} · Só C: ${c}<br>Só um: ${a + b + c} · União: ${u}`,
  );
});

on("nc-go", () => {
  put("nc-out", `C(${v("n")},${v("k")}) = ${fmt(nCr(v("n"), v("k")))}`);
});
on("pw-go", () => {
  const s = $("#pw").value.toUpperCase().replace(/[^LD]/g, "");
  if (!s) return put("pw-out", "Use L e D.", "badc");
  let t = 1;
  [...s].forEach((ch) => (t *= ch === "L" ? 26 : 10));
  put("pw-out", `${s}: ${fmt(t)} senhas`);
});

on("rel-go", () => {
  const els = $("#els")
    .value.split(/[,\s]+/)
    .filter(Boolean);
  const ps = [
    ...$("#pairs").value.matchAll(/\(\s*([^,()]+?)\s*,\s*([^,()]+?)\s*\)/g),
  ].map((m) => [m[1], m[2]]);
  const has = (x, y) => ps.some((p) => p[0] === x && p[1] === y);
  const refl = els.every((e) => has(e, e)),
    sym = ps.every(([x, y]) => has(y, x));
  const trans = ps.every(([x, y]) =>
    ps.every(([y2, z]) => y !== y2 || has(x, z)),
  );
  const anti = ps.every(([x, y]) => x === y || !has(y, x));
  const miss = els.filter((e) => !has(e, e)).map((e) => `(${e},${e})`);
  const t = (b) => (b ? "✔ sim" : "✘ não");
  put(
    "rel-out",
    `Reflexiva: ${t(refl)}<br>Simétrica: ${t(sym)}<br>Transitiva: ${t(trans)}<br>Antissimétrica: ${t(anti)}<br>Equivalência: ${t(refl && sym && trans)}<br>Ordem: ${t(refl && anti && trans)}<br>Fecho reflexivo adiciona: ${miss.join(" ") || "nada (já é reflexiva)"}`,
  );
});

on("fx-go", () => {
  try {
    const f = new Function(
      "x",
      "return " + $("#fx").value.replace(/\^/g, "**"),
    );
    const rows = [];
    const seen = {};
    let rep = false;
    for (let x = -3; x <= 3; x++) {
      const y = +f(x).toFixed(4);
      rows.push(`f(${x}) = ${y}`);
      if (seen[y] !== undefined) rep = true;
      seen[y] = x;
    }
    put(
      "fx-out",
      rows.join("<br>") +
        `<br>${rep ? "Há imagens repetidas: não é injetora em [−3,3]." : "Sem repetições em [−3,3]: possivelmente injetora."}`,
    );
  } catch (e) {
    put("fx-out", "Expressão inválida. Ex.: x^2+1", "badc");
  }
});
on("sz-go", () => {
  const a = v("sa"),
    b = v("sb");
  const m = [];
  m.push(a > b ? "Nunca injetora (casa dos pombos)." : "Pode ser injetora.");
  m.push(a < b ? "Nunca sobrejetora." : "Pode ser sobrejetora.");
  m.push(a === b ? "Pode ser bijetora." : "Não pode ser bijetora.");
  put("sz-out", m.join("<br>"));
});

document.querySelectorAll(".stepper").forEach((st) => {
  const items = [...st.querySelectorAll("li")];
  let i = 0;
  items.forEach((li, k) => li.classList.toggle("hid", k > 0));
  const b = st.querySelector("button");
  b.onclick = () => {
    if (i < items.length - 1) {
      items[++i].classList.remove("hid");
      if (i === items.length - 1) b.textContent = "Recomeçar";
    } else {
      i = 0;
      items.forEach((li, k) => li.classList.toggle("hid", k > 0));
      b.textContent = "Próximo passo";
    }
  };
});

const qz = $("#quiz");
if (qz) {
  let i = 0,
    pts = 0,
    order = [...QUIZ].sort(() => Math.random() - 0.5);
  const draw = () => {
    if (i >= order.length) {
      const p = Math.round((pts / order.length) * 100);
      qz.innerHTML = `<h2>Resultado: ${pts}/${order.length} (${p}%)</h2><p>${p >= 85 ? "Ótimo ritmo. Refaça só os erros." : "Releia as páginas dos tópicos que errou e tente de novo."}</p><button id="rs">Refazer</button>`;
      $("#rs").onclick = () => {
        i = 0;
        pts = 0;
        order.sort(() => Math.random() - 0.5);
        draw();
      };
      return;
    }
    const [q, o, c, e] = order[i];
    qz.innerHTML = `<div class="bar"><i style="width:${(i / order.length) * 100}%"></i></div><p>Questão ${i + 1} de ${order.length}</p><h3>${q}</h3>${o.map((t, k) => `<button class="opt" data-k="${k}">${t}</button>`).join("")}<div id="fb"></div>`;
    qz.querySelectorAll(".opt").forEach(
      (b) =>
        (b.onclick = () => {
          const k = +b.dataset.k;
          qz.querySelectorAll(".opt").forEach((x, j) => {
            x.disabled = true;
            if (j === c) x.classList.add("ok");
          });
          if (k === c) pts++;
          else b.classList.add("no");
          $("#fb").innerHTML =
            `<div class="tip">${e}</div><button id="nx">Continuar</button>`;
          $("#nx").onclick = () => {
            i++;
            draw();
          };
        }),
    );
  };
  draw();
}

const tr = $("#trilha");
if (tr) {
  const boxes = [...tr.querySelectorAll("input[type=checkbox]")];
  const saved = JSON.parse(localStorage.getItem("trilha") || "[]");
  const upd = () => {
    const n = boxes.filter((b) => b.checked).length;
    $("#prog").style.width = (n / boxes.length) * 100 + "%";
    $("#pt").textContent = `${n} de ${boxes.length} etapas`;
    try {
      localStorage.setItem(
        "trilha",
        JSON.stringify(boxes.map((b) => b.checked)),
      );
    } catch (e) {}
  };
  boxes.forEach((b, k) => {
    b.checked = !!saved[k];
    b.onchange = upd;
  });
  upd();
}
