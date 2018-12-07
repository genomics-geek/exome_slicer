from graphene import Int


class PrimaryKeyMixin(object):
    pk = Int(source='pk')
