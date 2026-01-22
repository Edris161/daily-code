from django.urls import path
from .views import TourListAPIView, TourDetailAPIView, ToursByDestinationAPIView

urlpatterns = [
    path('', TourListAPIView.as_view(), name='tour-list'),
    path('<slug:slug>/', TourDetailAPIView.as_view(), name='tour-detail'),
       path(
        'destinations/<slug:slug>/tours/',
        ToursByDestinationAPIView.as_view(),
        name='tours-by-destination'
    ),
]
