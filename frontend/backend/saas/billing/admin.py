from django.contrib import admin
from .models import Billing

@admin.register(Billing)
class BillingAdmin(admin.ModelAdmin):
    list_display = (
        "app",
        "department",
        "monthly_cost",
        "yearly_cost",
    )
    list_filter = ("department",)
    search_fields = ("app__name",)
