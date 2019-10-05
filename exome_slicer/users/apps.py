from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "exome_slicer.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            import exome_slicer.users.signals  # noqa F401
        except ImportError:
            pass
