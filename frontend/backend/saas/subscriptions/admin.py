from django.contrib import admin
from .models import Subscription

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = (
        "app",
        "plan_type",
        "licenses",
        "assigned_users",
        "renewal_date",
    )
    list_filter = ("plan_type",)
    search_fields = ("app__name",)
