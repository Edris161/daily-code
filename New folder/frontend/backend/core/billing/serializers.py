from rest_framework import serializers
from .models import SaaSApp, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("id", "name")


class SaaSAppSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source="department", write_only=True
    )

    class Meta:
        model = SaaSApp
        fields = (
            "id",
            "name",
            "category",
            "provider",
            "license_count",
            "monthly_cost",
            "annual_cost",
            "renewal_date",
            "department",
            "department_id",
            "assigned_users",
            "created_at",
        )
        read_only_fields = ("id", "created_at")
