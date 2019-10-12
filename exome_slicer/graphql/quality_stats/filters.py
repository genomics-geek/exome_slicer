from django.db.models import Q

from django_filters import BaseInFilter

from exome_slicer.quality_stats.models import QualityStat

from ..filterset import BaseFilterSet


class QualityStatFilter(BaseFilterSet):

    genes = BaseInFilter(label='Genes', method='filter_genes')
    quality_filters = BaseInFilter(
        label='Quality Filter',
        method='filter_quality_filters',
        help_text='Quality filters comma separated.  Format: min_coverage,avg_mapping_quality.',
    )

    class Meta:
        model = QualityStat
        fields = '__all__'

    def filter_genes(self, qs, field_name, value):
        return qs.filter(gene__in=[x.upper() for x in value]).distinct()

    def filter_quality_filters(self, queryset, name, value):
        return queryset.filter(
            Q(min_coverage__lte=value[0]) |
            Q(avg_mapping_quality__lte=value[1])
        )


class GeneFilter(BaseFilterSet):

    class Meta:
        model = QualityStat
        fields = ['gene']
