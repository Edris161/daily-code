from django.urls import path
from .views import (
    ProjectCreateView,
    ProjectListView,
    ProjectDeleteView,
)

urlpatterns = [
    path('create/', ProjectCreateView.as_view()),
    path('organization/<int:organization_id>/', ProjectListView.as_view()),
    path('delete/<int:pk>/', ProjectDeleteView.as_view()),
]
