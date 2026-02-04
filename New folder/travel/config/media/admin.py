from django.contrib import admin
from django.utils.html import format_html
from .models import Media

class FileTypeFilter(admin.SimpleListFilter):
    """Custom filter for file types"""
    title = 'File Type'
    parameter_name = 'file_type'

    def lookups(self, request, model_admin):
        # Get unique file types from existing files
        file_types = set()
        for media in Media.objects.all():
            if media.file_type:
                file_types.add(media.file_type)
        return [(ft, ft.upper()) for ft in sorted(file_types)]

    def queryset(self, request, queryset):
        if self.value():
            # Filter by file extension
            return queryset.filter(file__endswith=f".{self.value()}")
        return queryset

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    """Admin for Media model"""
    list_display = ['filename', 'file_type', 'file_size_kb', 'uploaded_by', 'uploaded_at', 'display_image']
    list_filter = [FileTypeFilter, 'uploaded_by', 'uploaded_at']  # ✅ Fixed: Using custom filter
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
        if obj.file and hasattr(obj.file, 'url'):
            file_type = obj.file_type.lower() if obj.file_type else ''
            if file_type in ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp']:
                return format_html('<img src="{}" width="150" height="100" style="object-fit: cover;" />', obj.file.url)
        return "Not an image or image not found"
    display_image.short_description = 'Preview'
    
    def file_size_kb(self, obj):
        if hasattr(obj, 'file_size'):
            return f"{obj.file_size:.2f} KB"
        return "N/A"
    file_size_kb.short_description = 'File Size'
    
    def filename(self, obj):
        if obj.file:
            return obj.filename
        return "No file"
    filename.short_description = 'File Name'
    
    def file_type(self, obj):
        if obj.file:
            return obj.file_type.upper()
        return "N/A"
    file_type.short_description = 'File Type'