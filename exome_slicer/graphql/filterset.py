import itertools

from django.db.models import CharField, TextField

from django_filters import BaseInFilter, CharFilter, FilterSet
from django_filters.filterset import FILTER_FOR_DBFIELD_DEFAULTS
from graphene_django.filter.filterset import GRAPHENE_FILTER_SET_OVERRIDES

from .filters import GlobalIDInFilter


FILTER_OVERRIDES = {
    CharField: {
        'filter_class': CharFilter,
        'extra': lambda f: {'lookup_expr': 'iexact'}
    },
    TextField: {
        'filter_class': CharFilter,
        'extra': lambda f: {'lookup_expr': 'iexact'},
    },
}


class BaseFilterSet(FilterSet):
    FILTER_DEFAULTS = dict(itertools.chain(
        FILTER_FOR_DBFIELD_DEFAULTS.items(),
        FILTER_OVERRIDES.items(),
        GRAPHENE_FILTER_SET_OVERRIDES.items(),
    ))

    id__in = GlobalIDInFilter(field_name='pk', distinct=True)
    pk__in = BaseInFilter(field_name='pk', distinct=True)
    sort_by = CharFilter(label='filter_sort_by', method='filter_sort_by')

    def filter_sort_by(self, queryset, name, value):
        return queryset.order_by(*value.strip().split(','))
