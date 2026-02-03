from django.db.models import Count
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from saas.models import SaaSApp


class DashboardStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total = SaaSApp.objects.count()
        active = SaaSApp.objects.filter(is_active=True).count()
        inactive = SaaSApp.objects.filter(is_active=False).count()

        return Response({
            "total_saas": total,
            "active_saas": active,
            "inactive_saas": inactive,
        })


class SaaSGrowthView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        data = (
            SaaSApp.objects
            .annotate(month=now().date().replace(day=1))
            .values("month")
            .annotate(count=Count("id"))
            .order_by("month")
        )

        return Response(data)
