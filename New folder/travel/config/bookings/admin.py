from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'tour', 'full_name', 'email', 
                    'number_of_people', 'preferred_date', 
                    'status', 'created_at')
    list_filter = ('status', 'tour', 'preferred_date')
    search_fields = ('full_name', 'email', 'phone', 'tour__title')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Booking Information', {
            'fields': ('user', 'tour', 'total_price')
        }),
        ('Customer Details', {
            'fields': ('full_name', 'email', 'phone')
        }),
        ('Booking Details', {
            'fields': ('number_of_people', 'preferred_date', 'special_requests')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def total_price(self, obj):
        return obj.total_price
    total_price.short_description = 'Total Price'