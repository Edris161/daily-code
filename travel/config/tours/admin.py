from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Tour  # Only import ONCE

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('title', 'destination', 'duration_days', 'price', 
                    'available_seats', 'is_active', 'created_at')
    list_filter = ('is_active', 'destination', 'currency')
    search_fields = ('title', 'description', 'destination__name')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('available_seats', 'created_at', 'updated_at')
    
    fieldsets = (
        (None, {
            'fields': ('destination', 'title', 'slug')
        }),
        ('Details', {
            'fields': ('description', 'duration_days', 'price', 'currency')
        }),
        ('Capacity', {
            'fields': ('max_people', 'available_seats')
        }),
        ('Services', {
            'fields': ('start_dates', 'included_services', 'excluded_services')
        }),
        ('Status', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )
    
    actions = ['activate_tours', 'deactivate_tours']
    
    def activate_tours(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} tours activated.')
    activate_tours.short_description = _("Activate selected tours")
    
    def deactivate_tours(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} tours deactivated.')
    deactivate_tours.short_description = _("Deactivate selected tours")
    
    def get_queryset(self, request):
        """Optimize database queries."""
        queryset = super().get_queryset(request)
        return queryset.select_related('destination')