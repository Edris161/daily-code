from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "customer_name",
        "visit_date",
        "delivery_date",
        "price",
        "receipt_paid",
        "remaining",
        "created_at",
    )

    readonly_fields = ("remaining", "created_at", "updated_at")

    search_fields = ("customer_name",)
    list_filter = ("visit_date", "delivery_date")
