from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .utils import (
    department_spending,
    cost_vs_usage,
    license_utilization,
)

class IsAdminOrManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ["admin", "manager"]


class DepartmentSpendingReport(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrManager]

    def get(self, request):
        data = department_spending()
        return Response({
            "success": True,
            "data": data
        })


class CostVsUsageReport(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrManager]

    def get(self, request):
        data = cost_vs_usage()
        return Response({
            "success": True,
            "data": data
        })


class LicenseUtilizationReport(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrManager]

    def get(self, request):
        data = license_utilization()
        return Response({
            "success": True,
            "data": data
        })
