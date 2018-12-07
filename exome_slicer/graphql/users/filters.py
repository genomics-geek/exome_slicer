from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from ..filterset import BaseFilterSet


class UserFilter(BaseFilterSet):

    class Meta:
        model = get_user_model()
        fields = '__all__'


class AuthGroupFilter(BaseFilterSet):

    class Meta:
        model = Group
        fields = '__all__'


class AuthPermissionFilter(BaseFilterSet):

    class Meta:
        model = Permission
        fields = '__all__'


class ContentTypeFilter(BaseFilterSet):

    class Meta:
        model = ContentType
        fields = '__all__'
