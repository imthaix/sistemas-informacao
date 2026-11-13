"""
Modelos do Sistema de Controle de Estoque.

Relacionamentos:
    Categoria  1 ---- N  Produto          (ForeignKey)
    Fornecedor N ---- N  Produto          (ManyToManyField)
    Produto    1 ---- N  Movimentacao     (ForeignKey)

Regras de negócio implementadas aqui (lado do servidor):
    RN1 - Não é possível registrar uma SAÍDA maior que o estoque disponível.
    RN2 - Toda movimentação (entrada/saída) atualiza AUTOMATICAMENTE o estoque
          do produto, dentro de uma transação para garantir consistência.
"""
from decimal import Decimal

from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models, transaction


class Categoria(models.Model):
    """Agrupa produtos semelhantes (ex.: Bebidas, Limpeza, Eletrônicos)."""

    # A chave primária (id, AutoField) é criada automaticamente pelo Django.
    nome = models.CharField("Nome", max_length=80, unique=True)
    descricao = models.TextField("Descrição", blank=True)

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ["nome"]

    def __str__(self):
        return self.nome


class Fornecedor(models.Model):
    """Empresa que fornece produtos ao estoque."""

    nome = models.CharField("Nome / Razão social", max_length=120)
    cnpj = models.CharField("CNPJ", max_length=18, unique=True)
    email = models.EmailField("E-mail", blank=True)
    telefone = models.CharField("Telefone", max_length=20, blank=True)

    class Meta:
        verbose_name = "Fornecedor"
        verbose_name_plural = "Fornecedores"
        ordering = ["nome"]

    def __str__(self):
        return f"{self.nome} ({self.cnpj})"


class Produto(models.Model):
    """Item controlado no estoque."""

    nome = models.CharField("Nome", max_length=120)
    sku = models.CharField("Código (SKU)", max_length=30, unique=True)
    descricao = models.TextField("Descrição", blank=True)
    preco = models.DecimalField(
        "Preço de venda (R$)",
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.01"))],
    )
    quantidade = models.PositiveIntegerField("Quantidade em estoque", default=0)
    estoque_minimo = models.PositiveIntegerField(
        "Estoque mínimo",
        default=5,
        help_text="Abaixo (ou igual) a este valor o produto entra em alerta.",
    )
    ativo = models.BooleanField("Ativo", default=True)
    data_cadastro = models.DateTimeField("Cadastrado em", auto_now_add=True)

    # Relacionamento 1:N -> PROTECT impede apagar uma categoria que ainda tem produtos.
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.PROTECT,
        related_name="produtos",
        verbose_name="Categoria",
    )
    # Relacionamento N:N -> um produto pode ter vários fornecedores e vice-versa.
    fornecedores = models.ManyToManyField(
        Fornecedor,
        related_name="produtos",
        blank=True,
        verbose_name="Fornecedores",
    )

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"
        ordering = ["nome"]

    def __str__(self):
        return f"{self.nome} [{self.sku}]"

    @property
    def estoque_baixo(self):
        """RN3: o produto está em alerta quando quantidade <= estoque mínimo."""
        return self.quantidade <= self.estoque_minimo

    @property
    def valor_total_em_estoque(self):
        """Valor financeiro parado no estoque deste produto."""
        return self.quantidade * self.preco


class Movimentacao(models.Model):
    """
    Registro de entrada ou saída de um produto.

    É um histórico (log) e por isso não deve ser editado depois de criado:
    para corrigir um erro, registra-se uma nova movimentação.
    """

    ENTRADA = "E"
    SAIDA = "S"
    TIPOS = [
        (ENTRADA, "Entrada"),
        (SAIDA, "Saída"),
    ]

    produto = models.ForeignKey(
        Produto,
        on_delete=models.PROTECT,  # não apaga produto que tem histórico
        related_name="movimentacoes",
        verbose_name="Produto",
    )
    tipo = models.CharField("Tipo", max_length=1, choices=TIPOS)
    quantidade = models.PositiveIntegerField(
        "Quantidade", validators=[MinValueValidator(1)]
    )
    observacao = models.CharField("Observação", max_length=200, blank=True)
    data = models.DateTimeField("Data/hora", auto_now_add=True)

    class Meta:
        verbose_name = "Movimentação"
        verbose_name_plural = "Movimentações"
        ordering = ["-data", "-id"]

    def __str__(self):
        return f"{self.get_tipo_display()} de {self.quantidade}x {self.produto.nome}"

    # ------------------------------------------------------------------
    # RN1 - Validação: impede saída maior que o estoque disponível.
    # O ModelForm (e também o Django Admin) chama clean() automaticamente,
    # então a regra vale tanto na tela do sistema quanto no painel admin.
    # ------------------------------------------------------------------
    def clean(self):
        super().clean()
        # Se produto/tipo/quantidade falharam na validação de campo, ignora.
        if not (self.produto_id and self.tipo and self.quantidade):
            return
        # Só valida na criação (movimentações antigas não são alteradas).
        if self.pk is None and self.tipo == self.SAIDA:
            if self.quantidade > self.produto.quantidade:
                raise ValidationError(
                    f"Estoque insuficiente: disponível {self.produto.quantidade} "
                    f"unidade(s), mas foram solicitadas {self.quantidade}."
                )

    # ------------------------------------------------------------------
    # RN2 - Atualização automática do estoque.
    # ------------------------------------------------------------------
    def save(self, *args, **kwargs):
        # Movimentação já existente: apenas salva (não mexe no estoque de novo).
        if self.pk is not None:
            return super().save(*args, **kwargs)

        # transaction.atomic: ou grava a movimentação E atualiza o produto,
        # ou não grava nada (evita estoque inconsistente em caso de erro).
        with transaction.atomic():
            # select_for_update trava a linha do produto, evitando que duas
            # vendas simultâneas "gastem" o mesmo estoque (condição de corrida).
            produto = Produto.objects.select_for_update().get(pk=self.produto_id)

            if self.tipo == self.SAIDA:
                # Revalida com o valor MAIS ATUAL do banco (defesa extra da RN1).
                if self.quantidade > produto.quantidade:
                    raise ValidationError(
                        f"Estoque insuficiente: disponível {produto.quantidade}."
                    )
                produto.quantidade -= self.quantidade
            else:
                produto.quantidade += self.quantidade

            produto.save(update_fields=["quantidade"])
            super().save(*args, **kwargs)
