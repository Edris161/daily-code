import django_filters
from .models import Destination

class DestinationFilter(django_filters.FilterSet):
    country = django_filters.CharFilter(field_name='country', lookup_expr='iexact')
    city = django_filters.CharFilter(field_name='city', lookup_expr='icontains')
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    is_featured = django_filters.BooleanFilter(field_name='is_featured')
    
    class Meta:
        model = Destination
        fields = ['country', 'city', 'name', 'is_featured']