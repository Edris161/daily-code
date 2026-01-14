from django.urls import path
from .views import (
    BookingCreateView,
    MyBookingsView,
    AdminBookingsView,
    BookingStatusUpdateView
)

urlpatterns = [
    path('', BookingCreateView.as_view(), name='booking-create'),
    path('my/', MyBookingsView.as_view(), name='my-bookings'),
    path('admin/', AdminBookingsView.as_view(), name='admin-bookings'),
    path('<int:pk>/status/', BookingStatusUpdateView.as_view(), name='booking-status-update'),
]