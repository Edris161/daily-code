from rest_framework import serializers
from .models import Notification
from billing.serializers import SaaSAppSerializer

class NotificationSerializer(serializers.ModelSerializer):
    saas_app = SaaSAppSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = (
            "id",
            "saas_app",
            "alert_type",
            "message",
            "is_read",
            "created_at",
            "notify_date",
        )
