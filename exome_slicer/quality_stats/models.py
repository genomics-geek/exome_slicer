# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _


class QualityStat(models.Model):

    chromosome = models.CharField(max_length=2)
    start = models.PositiveIntegerField()
    end = models.PositiveIntegerField()
    region = models.CharField(max_length=100)
    gene = models.CharField(
        db_index=True,
        max_length=255,
    )
    transcript = models.CharField(
        db_index=True,
        max_length=255,
    )
    cds_exon = models.PositiveIntegerField()
    number_of_baits = models.PositiveIntegerField()
    bases_covered_by_baits = models.PositiveIntegerField()
    number_of_bases_in_region = models.PositiveIntegerField()
    pct_bases_covered_by_baits = models.DecimalField(
        db_index=True,
        decimal_places=3,
        max_digits=10,
    )
    avg_mapping_quality = models.DecimalField(
        db_index=True,
        decimal_places=3,
        max_digits=10,
        null=True,
        blank=True,
    )
    min_mapping_quality = models.DecimalField(
        decimal_places=3,
        max_digits=10,
        null=True,
        blank=True,
    )
    max_mapping_quality = models.DecimalField(
        decimal_places=3,
        max_digits=10,
        null=True,
        blank=True,
    )
    avg_coverage = models.DecimalField(
        decimal_places=3,
        max_digits=10,
    )
    min_coverage = models.DecimalField(
        db_index=True,
        decimal_places=3,
        max_digits=10,
    )
    max_coverage = models.DecimalField(
        decimal_places=3,
        max_digits=10,
    )

    class Meta:
        verbose_name = _('Quality Stat')
        verbose_name_plural = _('Quality Stats')

    def __str__(self):
        return self.locus

    @property
    def locus(self):
        return 'chr{0}:{1}-{2}'.format(self.chromosome, self.start, self.end)
