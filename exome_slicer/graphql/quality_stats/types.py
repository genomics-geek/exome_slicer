from graphene import Node, ObjectType, String
from graphene_django import DjangoObjectType

from exome_slicer.quality_stats.models import QualityStat

from ..mixins import PrimaryKeyMixin


class QualityStatNode(PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = QualityStat
        interfaces = (Node, )


class GeneNode(ObjectType):
    gene = String()


class TranscriptNode(ObjectType):
    transcript = String()
