from django.urls import path
from .views import TaskCreateView, TaskListView, TaskUpdateView, TaskDeleteView

urlpatterns = [
    path('create/', TaskCreateView.as_view(), name='task-create'),
    path('list/<int:project_id>/', TaskListView.as_view(), name='task-list'),
    path('update/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),
    path('delete/<int:pk>/', TaskDeleteView.as_view(), name='task-delete'),
]
