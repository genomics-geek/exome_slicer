# -*- coding: utf-8 -*-
from graphene import Field, ObjectType
from graphene_django.debug import DjangoDebug

from .quality_stats.queries import QualityStatsQuery
from .users.queries import UsersQuery


class Query(ObjectType, QualityStatsQuery, UsersQuery):
    debug = Field(DjangoDebug, name='__debug')
