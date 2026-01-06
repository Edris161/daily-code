from django.contrib import admin
from .models import SaaSApp

@admin.register(SaaSApp)
class SaaSAppAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "provider",
        "licenses",
        "active_users",
        "cost",
        "renewal_date",
    )
    search_fields = ("name", "provider")
    list_filter = ("category", "provider")
