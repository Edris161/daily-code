import django_filters
from .models import Destination
from django.db.models import Q

class DestinationFilter(django_filters.FilterSet):
    """Filter for destinations"""
    country = django_filters.CharFilter(field_name='country', lookup_expr='iexact')
    city = django_filters.CharFilter(field_name='city', lookup_expr='icontains')
    search = django_filters.CharFilter(method='filter_search')
    featured = django_filters.BooleanFilter(field_name='is_featured')
    
    class Meta:
        model = Destination
        fields = ['country', 'city', 'is_featured']
    
    def filter_search(self, queryset, name, value):
        """Search by name or country"""
        return queryset.filter(
            Q(name__icontains=value) |
            Q(country__icontains=value) |
            Q(city__icontains=value)
        )