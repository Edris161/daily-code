import django_filters
from .models import Tour
from django.db import models

class TourFilter(django_filters.FilterSet):
    destination = django_filters.CharFilter(field_name='destination__slug')
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    min_duration = django_filters.NumberFilter(field_name='duration_days', lookup_expr='gte')
    max_duration = django_filters.NumberFilter(field_name='duration_days', lookup_expr='lte')
    is_active = django_filters.BooleanFilter()
    search = django_filters.CharFilter(method='filter_search')
    
    class Meta:
        model = Tour
        fields = ['destination', 'min_price', 'max_price', 
                 'min_duration', 'max_duration', 'is_active']
    
    def filter_search(self, queryset, name, value):
        return queryset.filter(
            models.Q(title__icontains=value) |
            models.Q(description__icontains=value) |
            models.Q(destination__name__icontains=value)
        )