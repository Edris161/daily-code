from django.urls import path
from .views import ProjectCreateView, ProjectListView, ProjectDeleteView

urlpatterns = [
    path('create/', ProjectCreateView.as_view(), name='project-create'),
    path('list/<int:organization_id>/', ProjectListView.as_view(), name='project-list'),
    path('delete/<int:pk>/', ProjectDeleteView.as_view(), name='project-delete'),
]
