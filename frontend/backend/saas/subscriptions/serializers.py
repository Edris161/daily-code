from rest_framework import serializers
from .models import Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    app_name = serializers.CharField(
        source="app.name",
        read_only=True
    )

    class Meta:
        model = Subscription
        fields = "__all__"
