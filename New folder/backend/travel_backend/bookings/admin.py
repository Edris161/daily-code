from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'email',
        'tour',
        'status',
        'created_at',
    )
    list_filter = ('status', 'created_at')
    search_fields = ('full_name', 'email')
