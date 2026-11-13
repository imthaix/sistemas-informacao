# Sistema de Controle de Estoque

## Identificação

- **Aplicação:** Sistema de Controle de Estoque
- **Aluno:** _Thaislainy Santos_
- **Disciplina:** Técnicas Avançadas de Programação Web — Prof. Renato Sousa Botacim
- **Descrição resumida:** aplicação web em Django para cadastrar produtos, categorias e fornecedores e controlar entradas e saídas de estoque, com alertas de reposição.

## Sobre o projeto

**Problema que resolve:** pequenos comércios costumam controlar estoque em planilhas ou no papel, o que gera erros de saldo, vendas sem produto disponível e falta de aviso para repor mercadorias.

**Objetivo:** centralizar o controle de estoque, garantindo que o saldo de cada produto seja sempre consistente com o histórico de movimentações.

**Principais funcionalidades**

- CRUD completo de **Produtos** e **Categorias** pela interface web.
- Cadastro de **Fornecedores** (via Django Admin) e vínculo N:N com produtos.
- Registro de **movimentações** de entrada e saída, com histórico.
- **Dashboard** com total de produtos, valor em estoque e lista de produtos em alerta.
- Busca por nome/SKU, filtro por categoria e filtro de estoque baixo.
- Painel **Django Admin** configurado (list_display, search_fields, list_filter).

## Regras de negócio implementadas (lado do servidor)

1. **RN1 – Saída não pode exceder o estoque.** `Movimentacao.clean()` bloqueia a saída com mensagem de erro; no `save()` a checagem é repetida com a linha do produto travada (`select_for_update`), evitando condição de corrida.
2. **RN2 – Atualização automática do estoque.** Ao salvar uma movimentação, a quantidade do produto é somada (entrada) ou subtraída (saída) dentro de `transaction.atomic()`: ou grava tudo, ou nada.
3. **RN3 – Alerta de estoque baixo.** Produto com `quantidade <= estoque_minimo` aparece em alerta no dashboard e na listagem.
4. **RN4 – Produto com histórico não pode ser excluído** (`on_delete=PROTECT`); deve ser desativado.
5. **RN5 – Categoria com produtos não pode ser excluída.**
6. **RN6 – Quantidade não é editável diretamente** no formulário de edição do produto; só muda por movimentações.

## Modelos e relacionamentos

| Modelo       | Relacionamento                    |
| ------------ | --------------------------------- |
| `Categoria`  | 1 → N `Produto` (ForeignKey)      |
| `Fornecedor` | N ↔ N `Produto` (ManyToManyField) |
| `Produto`    | 1 → N `Movimentacao` (ForeignKey) |

## Como executar

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # acesso ao /admin/
python manage.py popular_dados    # (opcional) dados de exemplo
python manage.py runserver
```

Acesse http://127.0.0.1:8000/ (sistema) e http://127.0.0.1:8000/admin/ (painel).

Testes automatizados: `python manage.py test`

## Estrutura

```
config/            configurações e urls do projeto
estoque/
  models.py        modelos + regras de negócio
  forms.py         ModelForms e validações
  views.py         CRUD, dashboard e movimentações
  urls.py          rotas do app
  admin.py         configuração do Django Admin
  tests.py         testes das regras de negócio
  migrations/      migrations do banco
  templates/       base.html (herança), páginas e parcial com include
  static/          style.css
  management/      comando popular_dados
```

## Tecnologias

Python 3 e Django 5.2 (única dependência externa), SQLite.
