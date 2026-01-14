from django.urls import path
from .views import (
    ReviewCreateView,
    TourReviewsView,
    ReviewUpdateDeleteView
)

urlpatterns = [
    path('', ReviewCreateView.as_view(), name='review-create'),
    path('tour/<slug:tour_slug>/', TourReviewsView.as_view(), name='tour-reviews'),
    path('<int:pk>/', ReviewUpdateDeleteView.as_view(), name='review-detail'),
]