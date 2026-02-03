from django.contrib import admin
from .models import Destination, DestinationImage

class DestinationImageInline(admin.TabularInline):
    model = DestinationImage
    extra = 1

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'city', 'is_featured', 'created_at')
    list_filter = ('country', 'is_featured')
    search_fields = ('name', 'country', 'city')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [DestinationImageInline]

@admin.register(DestinationImage)
class DestinationImageAdmin(admin.ModelAdmin):
    list_display = ('destination', 'alt_text', 'uploaded_at')
    list_filter = ('destination',)