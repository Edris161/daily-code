from django.contrib import admin
from .models import Review, TourRating

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'tour', 'rating', 'created_at')
    list_filter = ('rating', 'tour')
    search_fields = ('user__email', 'tour__title', 'comment')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(TourRating)
class TourRatingAdmin(admin.ModelAdmin):
    list_display = ('tour', 'average_rating', 'total_reviews', 'last_updated')
    list_filter = ('tour',)
    readonly_fields = ('last_updated',)