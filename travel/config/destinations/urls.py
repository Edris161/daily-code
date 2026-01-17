from django.urls import path
from .views import DestinationListView, DestinationDetailView, FeaturedDestinationsView

urlpatterns = [
    path('', DestinationListView.as_view(), name='destination-list'),
    path('featured/', FeaturedDestinationsView.as_view(), name='featured-destinations'),
    path('<slug:slug>/', DestinationDetailView.as_view(), name='destination-detail'),
]