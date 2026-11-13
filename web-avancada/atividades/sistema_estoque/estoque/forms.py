"""
Formulários do sistema (forms.ModelForm).

Fluxo completo exigido na atividade:
    Formulário -> Validação -> Processamento -> Persistência -> Retorno ao usuário
O fluxo é executado nas views (views.py); aqui ficam os formulários e suas validações.
"""
from django import forms

from .models import Categoria, Movimentacao, Produto


class CategoriaForm(forms.ModelForm):
    class Meta:
        model = Categoria
        fields = ["nome", "descricao"]
        widgets = {"descricao": forms.Textarea(attrs={"rows": 3})}


class ProdutoForm(forms.ModelForm):
    class Meta:
        model = Produto
        fields = [
            "nome", "sku", "descricao", "categoria", "fornecedores",
            "preco", "quantidade", "estoque_minimo", "ativo",
        ]
        widgets = {
            "descricao": forms.Textarea(attrs={"rows": 3}),
            "fornecedores": forms.SelectMultiple(attrs={"size": 4}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Ao EDITAR, a quantidade não pode ser alterada direto no formulário:
        # ela só muda por movimentações (garante histórico e consistência).
        if self.instance.pk:
            self.fields["quantidade"].disabled = True
            self.fields["quantidade"].help_text = (
                "Para alterar o estoque, registre uma movimentação."
            )

    def clean_sku(self):
        # Validação de formato: padroniza o SKU em maiúsculas e sem espaços.
        return self.cleaned_data["sku"].strip().upper()


class MovimentacaoForm(forms.ModelForm):
    """
    Formulário de entrada/saída de estoque.

    A regra de negócio (saída não pode exceder o estoque) está em
    Movimentacao.clean(), executada automaticamente por is_valid().
    """

    class Meta:
        model = Movimentacao
        fields = ["produto", "tipo", "quantidade", "observacao"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Só produtos ativos aparecem para movimentação.
        self.fields["produto"].queryset = Produto.objects.filter(ativo=True)
