"""
Comando para popular o banco com dados de exemplo (útil na apresentação).

Uso:  python manage.py popular_dados
"""
from decimal import Decimal

from django.core.management.base import BaseCommand

from estoque.models import Categoria, Fornecedor, Movimentacao, Produto


class Command(BaseCommand):
    help = "Cria categorias, fornecedores, produtos e movimentações de exemplo."

    def handle(self, *args, **options):
        if Produto.objects.exists():
            self.stdout.write(self.style.WARNING("Já existem produtos; nada foi criado."))
            return

        info, limp = (Categoria.objects.create(nome=n, descricao=d) for n, d in [
            ("Informática", "Periféricos e acessórios"),
            ("Limpeza", "Produtos de limpeza em geral"),
        ])
        forn = Fornecedor.objects.create(
            nome="Distribuidora Alfa", cnpj="12.345.678/0001-90",
            email="contato@alfa.com", telefone="(27) 3333-4444",
        )

        dados = [
            ("Mouse sem fio", "INF-001", info, "59.90", 5),
            ("Teclado mecânico", "INF-002", info, "249.90", 5),
            ("Detergente 500ml", "LMP-001", limp, "3.50", 20),
        ]
        for nome, sku, cat, preco, minimo in dados:
            produto = Produto.objects.create(
                nome=nome, sku=sku, categoria=cat,
                preco=Decimal(preco), estoque_minimo=minimo,
            )
            produto.fornecedores.add(forn)
            # Usa Movimentacao (e não quantidade direta) para respeitar a RN2.
            Movimentacao.objects.create(
                produto=produto, tipo=Movimentacao.ENTRADA,
                quantidade=10, observacao="Estoque inicial",
            )
        self.stdout.write(self.style.SUCCESS("Dados de exemplo criados!"))
