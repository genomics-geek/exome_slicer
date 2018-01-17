# -*- coding: utf-8 -*-
from rest_framework import routers

from . import viewsets


router = routers.SimpleRouter()
router.register(r'stats', viewsets.QualityStatViewSet)
router.register(r'genes', viewsets.GeneViewSet, base_name='gene')
router.register(r'transcripts', viewsets.TranscriptViewSet, base_name='transcript')

default_router = routers.DefaultRouter()
default_router.register(r'stats', viewsets.QualityStatViewSet)
default_router.register(r'genes', viewsets.GeneViewSet, base_name='gene')
default_router.register(r'transcripts', viewsets.TranscriptViewSet, base_name='transcript')


urlpatterns = default_router.urls
