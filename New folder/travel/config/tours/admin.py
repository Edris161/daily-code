from django.contrib import admin
from django.utils.html import format_html
from .models import Tour, TourGallery

class TourGalleryInline(admin.TabularInline):
    """Inline for tour gallery images"""
    model = TourGallery
    extra = 1
    fields = ['image', 'order', 'created_at']
    readonly_fields = ['created_at']

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    """Admin for Tour model"""
    list_display = ['title', 'destination', 'price', 'duration_days', 'is_active', 'created_at']
    list_filter = ['destination', 'is_active', 'created_at']
    search_fields = ['title', 'description', 'destination__name']
    prepopulated_fields = {'slug': ['title']}
    readonly_fields = ['created_at', 'updated_at', 'available_spots']
    fieldsets = (
        ('Basic Information', {
            'fields': ('destination', 'title', 'slug', 'description')
        }),
        ('Pricing & Duration', {
            'fields': ('duration_days', 'price', 'currency')
        }),
        ('Capacity & Dates', {
            'fields': ('max_people', 'available_spots', 'start_dates')
        }),
        ('Services', {
            'fields': ('included_services', 'excluded_services')
        }),
        ('Settings', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    inlines = [TourGalleryInline]
    
    def available_spots(self, obj):
        return obj.available_spots
    available_spots.short_description = 'Available Spots'