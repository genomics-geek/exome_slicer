from django.db.models import Q

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

    all_transcripts = Field(
        lambda: List(types.TranscriptNode),
        limit=Int(),
        transcript=String(),
        gene=String(required=True),
        search=String(),
    )

    def resolve_all_genes(self, info, **kwargs):
        queryset = QualityStat.objects.distinct()

        if kwargs.get('symbol'):
            queryset = queryset.filter(Q(gene__iexact=kwargs.get('symbol')))

        if kwargs.get('search'):
            queryset = queryset.filter(Q(gene__icontains=kwargs.get('search')))

        queryset = queryset.values('gene').distinct()
        if kwargs.get('limit'):
            queryset = queryset[:kwargs.get('limit')]

        return queryset

    def resolve_all_transcripts(self, info, **kwargs):
        queryset = QualityStat.objects.distinct()

        if kwargs.get('transcript'):
            queryset = queryset.filter(Q(transcript__iexact=kwargs.get('transcript')))

        if kwargs.get('gene'):
            queryset = queryset.filter(Q(gene__iexact=kwargs.get('gene')))

        if kwargs.get('search'):
            queryset = queryset.filter(Q(transcript__icontains=kwargs.get('search')))

        queryset = queryset.values('transcript').distinct()
        if kwargs.get('limit'):
            queryset = queryset[:kwargs.get('limit')]

        return queryset
