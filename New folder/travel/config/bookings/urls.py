from django.urls import path
from .views import (
    CreateBookingView, UserBookingsView, 
    AdminBookingsView, UpdateBookingStatusView
)

urlpatterns = [
    path('', CreateBookingView.as_view(), name='create-booking'),
    path('my/', UserBookingsView.as_view(), name='user-bookings'),
    path('admin/', AdminBookingsView.as_view(), name='admin-bookings'),
    path('admin/<uuid:pk>/status/', UpdateBookingStatusView.as_view(), name='update-booking-status'),
]