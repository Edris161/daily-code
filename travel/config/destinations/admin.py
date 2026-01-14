from django.contrib import admin
from .models import Destination

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'city', 'is_featured', 'created_at')
    list_filter = ('country', 'city', 'is_featured')
    search_fields = ('name', 'country', 'city', 'short_description')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')
    filter_horizontal = ('gallery_images',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'country', 'city')
        }),
        ('Descriptions', {
            'fields': ('short_description', 'full_description')
        }),
        ('Media', {
            'fields': ('cover_image', 'gallery_images')
        }),
        ('Location', {
            'fields': ('latitude', 'longitude')
        }),
        ('Settings', {
            'fields': ('is_featured',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )