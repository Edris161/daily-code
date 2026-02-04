from django.urls import path
from .views import (
    MediaListView,
    MediaUploadView,
    MediaDetailView,
    UserMediaView,
    MediaStatsView
)

urlpatterns = [
    path('', MediaListView.as_view(), name='media-list'),
    path('upload/', MediaUploadView.as_view(), name='media-upload'),
    path('my/', UserMediaView.as_view(), name='my-media'),
    path('stats/', MediaStatsView.as_view(), name='media-stats'),
    path('<uuid:pk>/', MediaDetailView.as_view(), name='media-detail'),
]