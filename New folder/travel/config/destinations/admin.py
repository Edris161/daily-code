from django.contrib import admin
from django.utils.html import format_html
from .models import Destination, DestinationGallery

class DestinationGalleryInline(admin.TabularInline):
    """Inline for destination gallery images"""
    model = DestinationGallery
    extra = 1
    fields = ['image', 'order', 'created_at']
    readonly_fields = ['created_at']

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    """Admin for Destination model"""
    list_display = ['name', 'country', 'city', 'is_featured', 'created_at']
    list_filter = ['country', 'is_featured', 'created_at']
    search_fields = ['name', 'country', 'city']
    prepopulated_fields = {'slug': ['name', 'country']}
    readonly_fields = ['created_at', 'updated_at', 'display_cover_image']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'country', 'city')
        }),
        ('Description', {
            'fields': ('short_description', 'full_description')
        }),
        ('Media', {
            'fields': ('cover_image', 'display_cover_image')
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
    inlines = [DestinationGalleryInline]
    
    def display_cover_image(self, obj):
        if obj.cover_image and obj.cover_image.file:
            return format_html('<img src="{}" width="150" height="100" />', obj.cover_image.file.url)
        return "No image"
    display_cover_image.short_description = 'Cover Image Preview'