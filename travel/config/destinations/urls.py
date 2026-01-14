from django.urls import path
from .views import (
    DestinationListView,
    FeaturedDestinationsView,
    DestinationDetailView,
    DestinationCreateView,
    DestinationUpdateView
)

urlpatterns = [
    path('', DestinationListView.as_view(), name='destination-list'),
    path('featured/', FeaturedDestinationsView.as_view(), name='featured-destinations'),
    path('<slug:slug>/', DestinationDetailView.as_view(), name='destination-detail'),
    path('create/', DestinationCreateView.as_view(), name='destination-create'),
    path('<slug:slug>/update/', DestinationUpdateView.as_view(), name='destination-update'),
]