from django.urls import path
from .views import (
    TourListView,
    TourDetailView,
    TourByDestinationView,
    TourCreateView,
    TourUpdateView
)

urlpatterns = [
    path('', TourListView.as_view(), name='tour-list'),
    path('<slug:slug>/', TourDetailView.as_view(), name='tour-detail'),
    path('by-destination/<slug:destination_slug>/', TourByDestinationView.as_view(), name='tour-by-destination'),
    path('create/', TourCreateView.as_view(), name='tour-create'),
    path('<slug:slug>/update/', TourUpdateView.as_view(), name='tour-update'),
]