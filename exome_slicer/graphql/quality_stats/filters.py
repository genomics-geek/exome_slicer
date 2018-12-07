from exome_slicer.quality_stats.models import QualityStat

from ..filterset import BaseFilterSet


class QualityStatFilter(BaseFilterSet):

    class Meta:
        model = QualityStat
        fields = '__all__'


class GeneFilter(BaseFilterSet):

    class Meta:
        model = QualityStat
        fields = ['gene']
