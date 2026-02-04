from django.urls import path
from .views import (
    CreateReviewView,
    TourReviewsView,
    UserReviewsView,
    UpdateReviewView,
    DeleteReviewView,
    ReviewStatsView
)

urlpatterns = [
    path('', CreateReviewView.as_view(), name='create-review'),
    path('my/', UserReviewsView.as_view(), name='my-reviews'),
    path('tour/<slug:tour_slug>/', TourReviewsView.as_view(), name='tour-reviews'),
    path('tour/<slug:tour_slug>/stats/', ReviewStatsView.as_view(), name='review-stats'),
    path('<int:pk>/', UpdateReviewView.as_view(), name='update-review'),
    path('<int:pk>/delete/', DeleteReviewView.as_view(), name='delete-review'),
]