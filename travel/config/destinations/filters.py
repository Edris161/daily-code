import django_filters

from core import models
from .models import Destination

class DestinationFilter(django_filters.FilterSet):
    country = django_filters.CharFilter(field_name='country', lookup_expr='icontains')
    city = django_filters.CharFilter(field_name='city', lookup_expr='icontains')
    is_featured = django_filters.BooleanFilter()
    search = django_filters.CharFilter(method='filter_search')
    
    class Meta:
        model = Destination
        fields = ['country', 'city', 'is_featured']
    
    def filter_search(self, queryset, name, value):
        return queryset.filter(
            models.Q(name__icontains=value) |
            models.Q(country__icontains=value) |
            models.Q(city__icontains=value) |
            models.Q(short_description__icontains=value)
        )