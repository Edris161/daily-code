from django.contrib import admin
from .models import Player


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ("name", "age", "team", "created_at")
    list_filter = ("team",)
    search_fields = ("name",)
