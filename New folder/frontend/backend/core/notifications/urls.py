from django.urls import path
from .views import NotificationListView, MarkNotificationReadView

app_name = "notifications"

urlpatterns = [
    path("", NotificationListView.as_view(), name="notification_list"),
    path("mark-read/<int:pk>/", MarkNotificationReadView.as_view(), name="mark_notification_read"),
]
