"""Testes automatizados das regras de negócio. Execute: python manage.py test"""
from decimal import Decimal

from django.core.exceptions import ValidationError
from django.db.models.deletion import ProtectedError
from django.test import TestCase
from django.urls import reverse

from .forms import MovimentacaoForm
from .models import Categoria, Movimentacao, Produto


class RegrasDeNegocioTest(TestCase):
    def setUp(self):
        self.categoria = Categoria.objects.create(nome="Teste")
        self.produto = Produto.objects.create(
            nome="Item", sku="T-1", categoria=self.categoria,
            preco=Decimal("10.00"), quantidade=10, estoque_minimo=3,
        )

    def test_entrada_aumenta_estoque(self):
        Movimentacao.objects.create(produto=self.produto, tipo="E", quantidade=5)
        self.produto.refresh_from_db()
        self.assertEqual(self.produto.quantidade, 15)

    def test_saida_diminui_estoque(self):
        Movimentacao.objects.create(produto=self.produto, tipo="S", quantidade=4)
        self.produto.refresh_from_db()
        self.assertEqual(self.produto.quantidade, 6)

    def test_saida_maior_que_estoque_e_bloqueada_no_form(self):
        form = MovimentacaoForm({"produto": self.produto.pk, "tipo": "S", "quantidade": 11})
        self.assertFalse(form.is_valid())
        self.assertIn("Estoque insuficiente", str(form.errors))

    def test_saida_maior_que_estoque_e_bloqueada_no_save(self):
        with self.assertRaises(ValidationError):
            Movimentacao.objects.create(produto=self.produto, tipo="S", quantidade=99)
        self.produto.refresh_from_db()
        self.assertEqual(self.produto.quantidade, 10)  # estoque intacto

    def test_alerta_de_estoque_baixo(self):
        self.assertFalse(self.produto.estoque_baixo)
        Movimentacao.objects.create(produto=self.produto, tipo="S", quantidade=7)
        self.produto.refresh_from_db()
        self.assertTrue(self.produto.estoque_baixo)

    def test_categoria_com_produtos_nao_pode_ser_excluida(self):
        with self.assertRaises(ProtectedError):
            self.categoria.delete()


class FluxoWebTest(TestCase):
    def test_crud_produto_e_movimentacao_pelas_views(self):
        cat = Categoria.objects.create(nome="Cat")
        # CREATE
        r = self.client.post(reverse("estoque:produto_criar"), {
            "nome": "Caneta", "sku": " can-1 ", "categoria": cat.pk,
            "preco": "2.50", "quantidade": 8, "estoque_minimo": 2, "ativo": "on",
        })
        self.assertRedirects(r, reverse("estoque:produto_lista"))
        p = Produto.objects.get(nome="Caneta")
        self.assertEqual(p.sku, "CAN-1")  # SKU padronizado
        # Movimentação via view
        self.client.post(reverse("estoque:movimentacao_criar"),
                         {"produto": p.pk, "tipo": "S", "quantidade": 3})
        p.refresh_from_db()
        self.assertEqual(p.quantidade, 5)
        # DELETE bloqueado (tem histórico)
        self.client.post(reverse("estoque:produto_excluir", args=[p.pk]))
        self.assertTrue(Produto.objects.filter(pk=p.pk).exists())
