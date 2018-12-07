from graphene_django.filter import DjangoFilterConnectionField
from graphene import Field, Int, List, Node, String

from exome_slicer.quality_stats.models import QualityStat

from . import filters, types


class QualityStatsQuery(object):

    quality_stat = Node.Field(types.QualityStatNode)
    all_quality_stats = DjangoFilterConnectionField(
        types.QualityStatNode,
        filterset_class=filters.QualityStatFilter,
    )

    all_genes = Field(
        lambda: List(types.GeneNode),
        limit=Int(),
        symbol=String(),
        search=String(),
    )

    def resolve_all_genes(self, info, **kwargs):
        queryset = QualityStat.objects.distinct('gene')

        if kwargs.get('symbol'):
            queryset = queryset.filter(gene__iexact=kwargs.get('symbol'))

        if kwargs.get('search'):
            queryset = queryset.filter(gene__icontains=kwargs.get('search'))

        if kwargs.get('limit'):
            queryset = queryset[:kwargs.get('limit')]

        return queryset
