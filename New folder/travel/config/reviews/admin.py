from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """Admin for Review model"""
    list_display = ['user', 'tour', 'rating', 'created_at', 'updated_at']
    list_filter = ['rating', 'created_at', 'tour']
    search_fields = ['user__email', 'tour__title', 'comment']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Review Details', {
            'fields': ('user', 'tour', 'rating', 'comment')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )