import django_filters
from .models import Tour

class TourFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    min_duration = django_filters.NumberFilter(field_name='duration_days', lookup_expr='gte')
    max_duration = django_filters.NumberFilter(field_name='duration_days', lookup_expr='lte')
    destination = django_filters.CharFilter(field_name='destination__slug', lookup_expr='exact')
    
    class Meta:
        model = Tour
        fields = ['min_price', 'max_price', 'min_duration', 'max_duration', 'destination']