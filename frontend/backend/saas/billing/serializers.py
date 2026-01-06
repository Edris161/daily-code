from rest_framework import serializers
from .models import Billing

class BillingSerializer(serializers.ModelSerializer):
    app_name = serializers.CharField(
        source="app.name",
        read_only=True
    )

    class Meta:
        model = Billing
        fields = "__all__"
