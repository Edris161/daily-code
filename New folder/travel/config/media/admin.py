from django.contrib import admin
from django.utils.html import format_html
from .models import Media

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    """Admin for Media model"""
    list_display = ['filename', 'file_type', 'file_size_kb', 'uploaded_by', 'uploaded_at', 'display_image']
    list_filter = ['file_type', 'uploaded_by', 'uploaded_at']
    search_fields = ['filename', 'alt_text', 'uploaded_by__email']
    readonly_fields = ['id', 'file_type', 'file_size_kb', 'uploaded_at', 'display_image']
    fieldsets = (
        ('File Information', {
            'fields': ('id', 'file', 'display_image', 'alt_text')
        }),
        ('Metadata', {
            'fields': ('file_type', 'file_size_kb', 'uploaded_by')
        }),
        ('Timestamps', {
            'fields': ('uploaded_at',),
            'classes': ('collapse',)
        }),
    )
    
    def display_image(self, obj):
        if obj.file and obj.file_type in ['jpg', 'jpeg', 'png', 'gif']:
            return format_html('<img src="{}" width="150" height="100" />', obj.file.url)
        return "Not an image"
    display_image.short_description = 'Preview'
    
    def file_size_kb(self, obj):
        return f"{obj.file_size:.2f} KB"
    file_size_kb.short_description = 'File Size'
    
    def filename(self, obj):
        return obj.filename