from django.urls import path
from .views import TableListCreateView, BookingListCreateView

urlpatterns = [
    path('tables/', TableListCreateView.as_view(), name='tables'),
    path('bookings/', BookingListCreateView.as_view(), name='bookings'),
]
