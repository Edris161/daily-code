from django.urls import path
from .views import TaskCreateView, TaskListView

urlpatterns = [
    path('create/', TaskCreateView.as_view()),
    path('project/<int:project_id>/', TaskListView.as_view()),
]
