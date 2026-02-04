from django.urls import path
from .views import (
    CreateBookingView,
    UserBookingsView,
    AdminBookingsView,
    UpdateBookingStatusView,
    CancelBookingView
)

urlpatterns = [
    path('', CreateBookingView.as_view(), name='create-booking'),
    path('my/', UserBookingsView.as_view(), name='my-bookings'),
    path('admin/', AdminBookingsView.as_view(), name='admin-bookings'),
    path('<int:pk>/status/', UpdateBookingStatusView.as_view(), name='update-booking-status'),
    path('<int:pk>/cancel/', CancelBookingView.as_view(), name='cancel-booking'),
]