# -*- coding: utf-8 -*-
from rest_framework import serializers

from . import models


class QualityStatSerializer(serializers.ModelSerializer):
    """
    A simple serializer for Quality Stats
    """

    class Meta:
        model = models.QualityStat
        fields = (
            'id', 'locus', 'gene', 'transcript', 'cds_exon',
            'number_of_baits', 'bases_covered_by_baits',
            'number_of_bases_in_region', 'pct_bases_covered_by_baits',
            'avg_mapping_quality', 'min_mapping_quality', 'max_mapping_quality',
            'avg_coverage', 'min_coverage', 'max_coverage',
        )


class GeneSerializer(serializers.ModelSerializer):
    """A simple serializer for Genes"""

    class Meta:
        model = models.QualityStat
        fields = ('gene', )


class TranscriptSerializer(serializers.ModelSerializer):
    """A simple Hypermedia serializer for Transcripts"""

    class Meta:
        model = models.QualityStat
        fields = ('transcript', )
