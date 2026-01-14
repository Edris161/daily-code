from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'tour', 'status', 'preferred_date', 'created_at')
    list_filter = ('status', 'preferred_date')
    search_fields = ('full_name', 'email', 'phone', 'tour__title')
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('status',)
    
    fieldsets = (
        ('Booking Information', {
            'fields': ('user', 'tour', 'status')
        }),
        ('Customer Details', {
            'fields': ('full_name', 'email', 'phone')
        }),
        ('Booking Details', {
            'fields': ('number_of_people', 'preferred_date', 'special_requests')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['confirm_bookings', 'cancel_bookings']
    
    def confirm_bookings(self, request, queryset):
        updated = queryset.update(status=Booking.Status.CONFIRMED)
        self.message_user(request, f'{updated} bookings confirmed.')
    
    def cancel_bookings(self, request, queryset):
        updated = queryset.update(status=Booking.Status.CANCELLED)
        self.message_user(request, f'{updated} bookings cancelled.')
    
    confirm_bookings.short_description = "Confirm selected bookings"
    cancel_bookings.short_description = "Cancel selected bookings"