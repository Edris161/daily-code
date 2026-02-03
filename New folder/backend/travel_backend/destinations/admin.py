from django.contrib import admin
from .models import Destination


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'city', 'is_featured')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('is_featured', 'country')
    search_fields = ('name', 'city', 'country')
