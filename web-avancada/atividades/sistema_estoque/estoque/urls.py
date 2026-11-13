"""Rotas do app estoque."""
from django.urls import path

from . import views

app_name = "estoque"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),

    # CRUD de Produto
    path("produtos/", views.produto_lista, name="produto_lista"),
    path("produtos/novo/", views.produto_criar, name="produto_criar"),
    path("produtos/<int:pk>/", views.produto_detalhe, name="produto_detalhe"),
    path("produtos/<int:pk>/editar/", views.produto_editar, name="produto_editar"),
    path("produtos/<int:pk>/excluir/", views.produto_excluir, name="produto_excluir"),

    # CRUD de Categoria
    path("categorias/", views.categoria_lista, name="categoria_lista"),
    path("categorias/nova/", views.categoria_criar, name="categoria_criar"),
    path("categorias/<int:pk>/editar/", views.categoria_editar, name="categoria_editar"),
    path("categorias/<int:pk>/excluir/", views.categoria_excluir, name="categoria_excluir"),

    # Movimentações (entrada/saída)
    path("movimentacoes/", views.movimentacao_lista, name="movimentacao_lista"),
    path("movimentacoes/nova/", views.movimentacao_criar, name="movimentacao_criar"),
]
