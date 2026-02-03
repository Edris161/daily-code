from django.urls import path
from .views import (
    DestinationListAPIView,
    FeaturedDestinationAPIView,
    DestinationDetailAPIView
)

urlpatterns = [
    path('', DestinationListAPIView.as_view(), name='destination-list'),
    path('featured/', FeaturedDestinationAPIView.as_view(), name='destination-featured'),
    path('<slug:slug>/', DestinationDetailAPIView.as_view(), name='destination-detail'),
]
