from collections import OrderedDict
from django.conf import settings
from django.db.models import Q

from django_filters import BaseInFilter, Filter, TypedChoiceFilter
from graphql_relay import from_global_id


class DisplayChoiceFilter(TypedChoiceFilter):

    def __init__(self, *args, **kwargs):
        empty_label = getattr(settings, 'NULL_CHOICE_LABEL', '---------')
        empty_value = getattr(settings, 'NULL_CHOICE_VALUE', None)

        choices = kwargs.pop('choices')
        kwargs['choices'] = [(empty_value, empty_label)] + [(y, y) for x, y in choices]
        kwargs['coerce'] = lambda x: self.coerce(x, choices)

        super(DisplayChoiceFilter, self).__init__(*args, **kwargs)

    @staticmethod
    def coerce(x, choices):
        for key, value in OrderedDict(choices).items():
            if value.lower() == x.lower():
                return key


class GlobalIDFilter(Filter):

    def filter(self, qs, value):
        gid = from_global_id(value)[1]
        return super(GlobalIDFilter, self).filter(qs, gid)


class GlobalIDInFilter(BaseInFilter):

    def filter(self, qs, value):
        if value:
            value = [from_global_id(v)[1] for v in value]
        return super(GlobalIDInFilter, self).filter(qs, value)


class SearchFilter(Filter):

    def __init__(self, search_fields, **kwargs):
        super(SearchFilter, self).__init__(**kwargs)
        self.search_fields = search_fields

    def filter(self, qs, value):
        filter = Q()
        if value:
            for search_field in self.search_fields:
                filter |= Q(**{'{0}__icontains'.format(search_field): value})
        return qs.filter(filter).distinct()
