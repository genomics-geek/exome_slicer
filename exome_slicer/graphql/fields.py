from graphene import Int, Connection


class CountableConnectionBase(Connection):

    class Meta:
        abstract = True

    total_count = Int()

    def resolve_total_count(self, info, **kwargs):
        return self.iterable.count()
