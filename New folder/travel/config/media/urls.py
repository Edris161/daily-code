from django.urls import path
from .views import MediaListView, UploadMediaView, DeleteMediaView

urlpatterns = [
    path('', MediaListView.as_view(), name='media-list'),
    path('upload/', UploadMediaView.as_view(), name='upload-media'),
    path('<uuid:pk>/', DeleteMediaView.as_view(), name='delete-media'),
]