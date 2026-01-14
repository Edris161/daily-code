from django.urls import path
from .views import (
    MediaUploadView,
    MediaListView,
    MediaDeleteView
)

urlpatterns = [
    path('upload/', MediaUploadView.as_view(), name='media-upload'),
    path('', MediaListView.as_view(), name='media-list'),
    path('<int:pk>/', MediaDeleteView.as_view(), name='media-delete'),
]