from django.contrib import admin
from .models import Media

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_file_type', 'alt_text', 'created_at')
    list_filter = ('created_at',)  # Removed 'file_type' from list_filter
    search_fields = ('alt_text', 'file')
    readonly_fields = ('get_file_type', 'get_file_url', 'created_at', 'updated_at')
    
    fieldsets = (
        (None, {
            'fields': ('file', 'alt_text')
        }),
        ('Details', {
            'fields': ('get_file_type', 'get_file_url')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def get_file_type(self, obj):
        return obj.file_type
    get_file_type.short_description = 'File Type'
    get_file_type.admin_order_field = 'file'  # Allows ordering by file name
    
    def get_file_url(self, obj):
        return obj.file_url
    get_file_url.short_description = 'File URL'
    
    def file_url(self, obj):
        return obj.file_url
    file_url.short_description = 'File URL'