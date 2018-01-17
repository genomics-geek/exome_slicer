# -*- coding: utf-8
import re

from django.contrib import admin
from django.db.models import Q

from . import models


class QualityStatdmin(admin.ModelAdmin):
    model = models.QualityStat
    list_display = ('locus', 'gene', 'transcript', 'cds_exon')
    search_fields = ('gene', 'transcript')
    save_as = True

    def get_search_results(self, request, queryset, search_term):
        queryset, use_distinct = super(QualityStatdmin, self) \
            .get_search_results(request, queryset, search_term)

        if 'locus:' in search_term:
            (chromosome, start, end) = re.split(
                ':|>| ',
                search_term.replace('locus:', '').strip(),
            )
            queryset = self.model.objects.filter(
                Q(chromosome=chromosome) &
                Q(start=start) &
                Q(end=end)
            )

        return queryset, use_distinct
