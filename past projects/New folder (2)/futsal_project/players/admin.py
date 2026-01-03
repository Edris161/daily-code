from django.contrib import admin
from .models import Player

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'age', 'position', 'training_level', 'is_active')
    search_fields = ('full_name',)
