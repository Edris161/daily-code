from django.contrib import admin
from .models import Media

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'file_preview', 'alt_text', 'file_type', 'file_size', 'uploaded_at')
    list_filter = ('uploaded_at',)
    search_fields = ('alt_text', 'file')
    readonly_fields = ('file_type', 'file_size', 'uploaded_at', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Media File', {
            'fields': ('file', 'alt_text', 'uploaded_by')
        }),
        ('File Information', {
            'fields': ('file_type', 'file_size')
        }),
        ('Timestamps', {
            'fields': ('uploaded_at', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def file_preview(self, obj):
        if obj.file_type == 'image':
            return f'<img src="{obj.file.url}" style="max-height: 50px; max-width: 50px;" />'
        return f'📄 {obj.file.name}'
    
    file_preview.allow_tags = True
    file_preview.short_description = 'Preview'
    
    def file_size(self, obj):
        return f"{obj.file_size:.2f} MB"
    
    file_size.short_description = 'Size'