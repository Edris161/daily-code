import django_filters
from .models import Booking

class BookingFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name='status')
    start_date = django_filters.DateFilter(field_name='preferred_date', lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='preferred_date', lookup_expr='lte')
    email = django_filters.CharFilter(field_name='email', lookup_expr='icontains')
    
    class Meta:
        model = Booking
        fields = ['status', 'start_date', 'end_date', 'email']