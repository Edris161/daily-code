from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Notification
from .serializers import NotificationSerializer
from datetime import timedelta, date

# Admin/Manager only
class IsAdminOrManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ["admin", "manager"]


class NotificationListView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrManager]

    def get(self, request):
        alert_type = request.query_params.get("type", None)
        notifications = Notification.objects.all().order_by("-notify_date")
        if alert_type:
            notifications = notifications.filter(alert_type=alert_type)

        serializer = NotificationSerializer(notifications, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        })


class MarkNotificationReadView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrManager]

    def post(self, request, pk):
        try:
            notification = Notification.objects.get(pk=pk)
            notification.is_read = True
            notification.save()
            return Response({"success": True, "message": "Notification marked as read"})
        except Notification.DoesNotExist:
            return Response({"success": False, "message": "Notification not found"},
                            status=status.HTTP_404_NOT_FOUND)
