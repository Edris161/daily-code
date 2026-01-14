from django.contrib import admin
from .models import Tour
import json

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('title', 'destination', 'price', 'duration_days', 'is_active', 'created_at')
    list_filter = ('is_active', 'destination', 'currency')
    search_fields = ('title', 'description', 'destination__name')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('destination', 'title', 'slug', 'description')
        }),
        ('Pricing & Duration', {
            'fields': ('duration_days', 'price', 'currency', 'max_people')
        }),
        ('Dates & Services', {
            'fields': ('start_dates', 'included_services', 'excluded_services')
        }),
        ('Settings', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name in ['start_dates', 'included_services', 'excluded_services']:
            kwargs['widget'] = admin.widgets.AdminTextareaWidget
        return super().formfield_for_dbfield(db_field, request, **kwargs)