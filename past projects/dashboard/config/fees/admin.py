from django.contrib import admin
from .models import Fee


@admin.register(Fee)
class FeeAdmin(admin.ModelAdmin):
    list_display = ("player", "month", "amount", "paid", "paid_at")
    list_filter = ("paid", "month")
    search_fields = ("player__name",)
