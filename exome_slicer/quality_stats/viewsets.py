# -*- coding: utf-8 -*-
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from . import filters, models, serializers


class QualityStatViewSet(viewsets.ReadOnlyModelViewSet):
    """A simple ViewSet for viewing ExomeSlicer Stats."""
    queryset = models.QualityStat.objects.all()
    serializer_class = serializers.QualityStatSerializer
    filter_class = filters.QualityStatFilter
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ('gene', 'transcript')


class GeneViewSet(viewsets.ReadOnlyModelViewSet):
    """A simple ViewSet for viewing Genes."""
    queryset = models.QualityStat.objects.all().values('gene').distinct()
    serializer_class = serializers.GeneSerializer
    filter_class = filters.QualityStatFilter
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ('gene', )


class TranscriptViewSet(viewsets.ReadOnlyModelViewSet):
    """A simple ViewSet for viewing Transcripts."""
    queryset = models.QualityStat.objects.all().values('transcript').distinct()
    serializer_class = serializers.TranscriptSerializer
    filter_class = filters.QualityStatFilter
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ('transcript', )
