from graphene import Field, ObjectType
from graphene_django.debug import DjangoDebug

from .users.queries import UsersQuery


class Query(ObjectType, UsersQuery):
    debug = Field(DjangoDebug, name='__debug')
