"""
Views do sistema de estoque (function-based views, mais didáticas).

Padrão usado em todo CRUD:
    GET  -> mostra o formulário (vazio ou preenchido)
    POST -> valida (is_valid) -> processa/persiste (save) -> mensagem -> redirect
"""
from django.contrib import messages
from django.core.exceptions import ValidationError
from django.db.models import DecimalField, ExpressionWrapper, F, Q, Sum
from django.db.models.deletion import ProtectedError
from django.shortcuts import get_object_or_404, redirect, render

from .forms import CategoriaForm, MovimentacaoForm, ProdutoForm
from .models import Categoria, Movimentacao, Produto


# ----------------------------------------------------------------------
# Dashboard
# ----------------------------------------------------------------------
def dashboard(request):
    """Página inicial: resumo do estoque e alertas."""
    produtos = Produto.objects.filter(ativo=True)

    # RN3 - Alerta: produtos com quantidade <= estoque mínimo.
    # F("estoque_minimo") compara dois campos da mesma linha direto no banco.
    produtos_em_alerta = produtos.filter(quantidade__lte=F("estoque_minimo"))

    # Valor total do estoque = soma de (quantidade * preço), calculado no banco.
    valor_total = produtos.aggregate(
        total=Sum(
            ExpressionWrapper(
                F("quantidade") * F("preco"),
                output_field=DecimalField(max_digits=14, decimal_places=2),
            )
        )
    )["total"] or 0

    contexto = {
        "total_produtos": produtos.count(),
        "total_categorias": Categoria.objects.count(),
        "valor_total": valor_total,
        "produtos_em_alerta": produtos_em_alerta,
        "ultimas_movimentacoes": Movimentacao.objects.select_related("produto")[:5],
    }
    return render(request, "estoque/dashboard.html", contexto)


# ----------------------------------------------------------------------
# CRUD de Produto
# ----------------------------------------------------------------------
def produto_lista(request):
    """READ (lista) com busca por texto, filtro por categoria e por alerta."""
    produtos = Produto.objects.select_related("categoria")

    busca = request.GET.get("q", "").strip()
    categoria_id = request.GET.get("categoria", "")
    somente_alerta = request.GET.get("alerta") == "1"

    if busca:
        produtos = produtos.filter(Q(nome__icontains=busca) | Q(sku__icontains=busca))
    if categoria_id.isdigit():
        produtos = produtos.filter(categoria_id=categoria_id)
    if somente_alerta:
        produtos = produtos.filter(quantidade__lte=F("estoque_minimo"))

    contexto = {
        "produtos": produtos,
        "categorias": Categoria.objects.all(),
        "busca": busca,
        "categoria_id": categoria_id,
        "somente_alerta": somente_alerta,
    }
    return render(request, "estoque/produto_lista.html", contexto)


def produto_detalhe(request, pk):
    """READ (detalhe) com o histórico de movimentações do produto."""
    produto = get_object_or_404(Produto, pk=pk)
    contexto = {
        "produto": produto,
        "movimentacoes": produto.movimentacoes.all()[:10],
    }
    return render(request, "estoque/produto_detalhe.html", contexto)


def produto_criar(request):
    """CREATE."""
    form = ProdutoForm(request.POST or None)
    if request.method == "POST" and form.is_valid():       # validação
        produto = form.save()                              # persistência
        messages.success(request, f'Produto "{produto.nome}" cadastrado com sucesso!')
        return redirect("estoque:produto_lista")           # retorno ao usuário
    return render(request, "estoque/produto_form.html",
                  {"form": form, "titulo": "Novo produto"})


def produto_editar(request, pk):
    """UPDATE."""
    produto = get_object_or_404(Produto, pk=pk)
    form = ProdutoForm(request.POST or None, instance=produto)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, f'Produto "{produto.nome}" atualizado!')
        return redirect("estoque:produto_detalhe", pk=produto.pk)
    return render(request, "estoque/produto_form.html",
                  {"form": form, "titulo": f"Editar: {produto.nome}"})


def produto_excluir(request, pk):
    """DELETE (com tela de confirmação)."""
    produto = get_object_or_404(Produto, pk=pk)
    if request.method == "POST":
        try:
            produto.delete()
            messages.success(request, f'Produto "{produto.nome}" excluído.')
        except ProtectedError:
            # RN4 - produto com histórico de movimentações não pode ser excluído
            # (preserva a rastreabilidade). A alternativa é desativá-lo.
            messages.error(
                request,
                "Este produto possui movimentações registradas e não pode ser "
                "excluído. Desmarque a opção 'Ativo' para desativá-lo.",
            )
            return redirect("estoque:produto_detalhe", pk=pk)
        return redirect("estoque:produto_lista")
    return render(request, "estoque/confirmar_exclusao.html",
                  {"objeto": produto, "tipo": "produto",
                   "voltar": "estoque:produto_lista"})


# ----------------------------------------------------------------------
# CRUD de Categoria
# ----------------------------------------------------------------------
def categoria_lista(request):
    categorias = Categoria.objects.all()
    return render(request, "estoque/categoria_lista.html", {"categorias": categorias})


def categoria_criar(request):
    form = CategoriaForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        categoria = form.save()
        messages.success(request, f'Categoria "{categoria.nome}" criada!')
        return redirect("estoque:categoria_lista")
    return render(request, "estoque/categoria_form.html",
                  {"form": form, "titulo": "Nova categoria"})


def categoria_editar(request, pk):
    categoria = get_object_or_404(Categoria, pk=pk)
    form = CategoriaForm(request.POST or None, instance=categoria)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Categoria atualizada!")
        return redirect("estoque:categoria_lista")
    return render(request, "estoque/categoria_form.html",
                  {"form": form, "titulo": f"Editar: {categoria.nome}"})


def categoria_excluir(request, pk):
    categoria = get_object_or_404(Categoria, pk=pk)
    if request.method == "POST":
        try:
            categoria.delete()
            messages.success(request, "Categoria excluída.")
        except ProtectedError:
            # RN5 - categoria que ainda possui produtos não pode ser excluída.
            messages.error(
                request,
                "Não é possível excluir: existem produtos nesta categoria.",
            )
        return redirect("estoque:categoria_lista")
    return render(request, "estoque/confirmar_exclusao.html",
                  {"objeto": categoria, "tipo": "categoria",
                   "voltar": "estoque:categoria_lista"})


# ----------------------------------------------------------------------
# Movimentações (entrada / saída)
# ----------------------------------------------------------------------
def movimentacao_lista(request):
    movimentacoes = Movimentacao.objects.select_related("produto")
    tipo = request.GET.get("tipo", "")
    if tipo in (Movimentacao.ENTRADA, Movimentacao.SAIDA):
        movimentacoes = movimentacoes.filter(tipo=tipo)
    return render(request, "estoque/movimentacao_lista.html",
                  {"movimentacoes": movimentacoes[:100], "tipo": tipo})


def movimentacao_criar(request):
    """
    Fluxo completo: Formulário -> Validação -> Processamento -> Persistência -> Retorno.

    - Validação:     form.is_valid() executa Movimentacao.clean() (RN1: estoque suficiente)
    - Processamento: Movimentacao.save() atualiza o estoque do produto (RN2)
    - Persistência:  movimentação gravada + produto atualizado na mesma transação
    - Retorno:       mensagem de sucesso com o novo saldo
    """
    form = MovimentacaoForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        try:
            mov = form.save()
        except ValidationError as erro:
            # Caso raro: outra venda consumiu o estoque entre a validação e o save.
            form.add_error(None, erro)
        else:
            mov.produto.refresh_from_db()
            messages.success(
                request,
                f"{mov.get_tipo_display()} registrada! "
                f"Estoque atual de {mov.produto.nome}: {mov.produto.quantidade}.",
            )
            return redirect("estoque:movimentacao_lista")
    return render(request, "estoque/movimentacao_form.html", {"form": form})
