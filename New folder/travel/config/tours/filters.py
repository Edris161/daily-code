import django_filters
from django.db import models
from .models import Tour

class TourFilter(django_filters.FilterSet):
    """Filter for tours"""
    destination = django_filters.CharFilter(field_name='destination__slug')
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    min_duration = django_filters.NumberFilter(field_name='duration_days', lookup_expr='gte')
    max_duration = django_filters.NumberFilter(field_name='duration_days', lookup_expr='lte')
    active = django_filters.BooleanFilter(field_name='is_active')
    search = django_filters.CharFilter(method='filter_search')
    
    class Meta:
        model = Tour
        fields = [
            'destination', 'min_price', 'max_price',
            'min_duration', 'max_duration', 'active'
        ]
    
    def filter_search(self, queryset, name, value):
        """Search by title or description"""
        return queryset.filter(
            models.Q(title__icontains=value) |
            models.Q(description__icontains=value) |
            models.Q(destination__name__icontains=value)
        )