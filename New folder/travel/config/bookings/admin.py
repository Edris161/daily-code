from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    """Admin for Booking model"""
    list_display = ['booking_reference', 'tour', 'full_name', 'status', 'number_of_people', 'total_amount', 'created_at']
    list_filter = ['status', 'tour', 'created_at']
    search_fields = ['booking_reference', 'full_name', 'email', 'tour__title']
    readonly_fields = ['booking_reference', 'total_amount', 'created_at', 'updated_at', 'can_be_cancelled']
    fieldsets = (
        ('Booking Information', {
            'fields': ('booking_reference', 'user', 'tour', 'status')
        }),
        ('Customer Details', {
            'fields': ('full_name', 'email', 'phone')
        }),
        ('Booking Details', {
            'fields': ('number_of_people', 'total_amount', 'preferred_date', 'special_requests')
        }),
        ('Status', {
            'fields': ('can_be_cancelled',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    actions = ['confirm_selected', 'cancel_selected']
    
    def can_be_cancelled(self, obj):
        return obj.can_be_cancelled
    can_be_cancelled.boolean = True
    can_be_cancelled.short_description = 'Can be cancelled'
    
    def confirm_selected(self, request, queryset):
        """Confirm selected bookings"""
        updated = queryset.update(status=Booking.CONFIRMED)
        self.message_user(request, f"{updated} bookings confirmed.")
    confirm_selected.short_description = "Confirm selected bookings"
    
    def cancel_selected(self, request, queryset):
        """Cancel selected bookings"""
        updated = queryset.update(status=Booking.CANCELLED)
        self.message_user(request, f"{updated} bookings cancelled.")
    cancel_selected.short_description = "Cancel selected bookings"