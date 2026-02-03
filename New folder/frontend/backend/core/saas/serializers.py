from rest_framework import serializers
from .models import SaaSApp


class SaaSAppSerializer(serializers.ModelSerializer):
    usage_percentage = serializers.SerializerMethodField()

    class Meta:
        model = SaaSApp
        fields = [
            "id",
            "name",
            "category",
            "provider",
            "license_count",
            "active_users",
            "usage_percentage",
            "monthly_cost",
            "annual_cost",
            "renewal_date",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_usage_percentage(self, obj):
        if obj.license_count == 0:
            return 0
        return round((obj.active_users / obj.license_count) * 100, 2)

    def validate(self, data):
        license_count = data.get("license_count", 0)
        active_users = data.get("active_users", 0)
        monthly_cost = data.get("monthly_cost", 0)
        annual_cost = data.get("annual_cost", 0)

        if active_users > license_count:
            raise serializers.ValidationError(
                "Active users cannot be greater than license count."
            )

        if monthly_cost < 0 or annual_cost < 0:
            raise serializers.ValidationError(
                "Costs cannot be negative."
            )

        return data
