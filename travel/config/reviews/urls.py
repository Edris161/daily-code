from django.urls import path
from .views import (
    CreateReviewView, TourReviewsView, 
    UserReviewsView, TourRatingView
)

urlpatterns = [
    path('', CreateReviewView.as_view(), name='create-review'),
    path('tour/<slug:tour_slug>/', TourReviewsView.as_view(), name='tour-reviews'),
    path('my/', UserReviewsView.as_view(), name='user-reviews'),
    path('rating/<slug:tour_slug>/', TourRatingView.as_view(), name='tour-rating'),
]