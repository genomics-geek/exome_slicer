from graphene import Schema

from . import mutation, query


schema = Schema(query=query.Query, mutation=mutation.Mutation)
