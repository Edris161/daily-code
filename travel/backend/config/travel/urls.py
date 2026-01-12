from django.urls import path
from .views import (
    DestinationListView,
    DestinationDetailView,
    TourListView,
)

urlpatterns = [
    path('destinations/', DestinationListView.as_view()),
    path('destinations/<int:pk>/', DestinationDetailView.as_view()),
    path('tours/', TourListView.as_view()),
]
