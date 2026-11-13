"""Configuração do Django Admin (painel administrativo)."""
from django.contrib import admin

from .models import Categoria, Fornecedor, Movimentacao, Produto


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nome", "descricao")
    search_fields = ("nome",)


@admin.register(Fornecedor)
class FornecedorAdmin(admin.ModelAdmin):
    list_display = ("nome", "cnpj", "email", "telefone")
    search_fields = ("nome", "cnpj")


@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    # Colunas exibidas na listagem
    list_display = ("nome", "sku", "categoria", "preco", "quantidade",
                    "estoque_minimo", "ativo")
    # Barra lateral de filtros
    list_filter = ("categoria", "ativo")
    # Campo de busca
    search_fields = ("nome", "sku")
    # Widget melhor para escolher vários fornecedores (ManyToMany)
    filter_horizontal = ("fornecedores",)
    list_editable = ("ativo",)


@admin.register(Movimentacao)
class MovimentacaoAdmin(admin.ModelAdmin):
    list_display = ("data", "produto", "tipo", "quantidade", "observacao")
    list_filter = ("tipo", "data")
    search_fields = ("produto__nome", "produto__sku")
    date_hierarchy = "data"

    # Movimentação é um histórico: depois de criada, fica somente leitura
    # e não pode ser excluída (senão o estoque ficaria inconsistente).
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ("produto", "tipo", "quantidade", "observacao", "data")
        return ()

    def has_delete_permission(self, request, obj=None):
        return False
