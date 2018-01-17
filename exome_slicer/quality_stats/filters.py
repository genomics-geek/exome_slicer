# -*- coding: utf-8 -*-
from django.db.models import Q, CharField

import django_filters

from . import models


class QualityStatFilter(django_filters.rest_framework.FilterSet):

    genes = django_filters.CharFilter(
        label='Gene list',
        method='filter_genes',
    )

    avg_mapping_quality = django_filters.NumberFilter(lookup_expr='lte')
    min_coverage = django_filters.NumberFilter(lookup_expr='lte')

    quality_filters = django_filters.BaseCSVFilter(
        label='Quality Filter',
        method='filter_quality_filters',
        widget=django_filters.widgets.CSVWidget,
        help_text='Quality filters comma separated.  Format: min_coverage,avg_mapping_quality.',
    )

    class Meta:
        model = models.QualityStat
        fields = [
            'chromosome',
            'start',
            'end',
            'region',
            'gene',
            'transcript',
            'cds_exon',
            'number_of_baits',
            'bases_covered_by_baits',
            'number_of_bases_in_region',
            'pct_bases_covered_by_baits',
            'avg_mapping_quality',
            'min_mapping_quality',
            'max_mapping_quality',
            'avg_coverage',
            'min_coverage',
            'max_coverage',
        ]
        filter_overrides = {
            CharField: {
                'filter_class': django_filters.CharFilter,
                'extra': lambda f: {
                    'lookup_expr': 'iexact',
                },
            }
        }

    def filter_genes(self, queryset, name, value):
        symbols = [x.upper() for x in value.strip().split(',')]
        return queryset.filter(Q(gene__in=symbols)).distinct()

    def filter_quality_filters(self, queryset, name, value):
        return queryset.filter(
            Q(min_coverage__lte=value[0]) |
            Q(avg_mapping_quality__lte=value[1])
        )
