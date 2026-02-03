from django.urls import path
from .views import TourListView, TourDetailView, ToursByDestinationView

urlpatterns = [
    path('', TourListView.as_view(), name='tour-list'),
    path('<slug:slug>/', TourDetailView.as_view(), name='tour-detail'),
    path('by-destination/<slug:destination_slug>/', 
         ToursByDestinationView.as_view(), name='tours-by-destination'),
]