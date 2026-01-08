from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import SaaSApp, Department
from .serializers import SaaSAppSerializer, DepartmentSerializer

# Only admin/managers can manage costs
class IsAdminOrManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ["admin", "manager"]


class SaaSAppListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrManager]

    def get(self, request):
        apps = SaaSApp.objects.all().order_by("-created_at")
        serializer = SaaSAppSerializer(apps, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        })

    def post(self, request):
        serializer = SaaSAppSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            "success": True,
            "message": "SaaS app created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)


class SaaSAppDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrManager]

    def get_object(self, pk):
        try:
            return SaaSApp.objects.get(pk=pk)
        except SaaSApp.DoesNotExist:
            return None

    def put(self, request, pk):
        app = self.get_object(pk)
        if not app:
            return Response({"success": False, "message": "SaaS app not found"},
                            status=status.HTTP_404_NOT_FOUND)
        serializer = SaaSAppSerializer(app, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"success": True, "message": "SaaS app updated", "data": serializer.data})

    def delete(self, request, pk):
        app = self.get_object(pk)
        if not app:
            return Response({"success": False, "message": "SaaS app not found"},
                            status=status.HTTP_404_NOT_FOUND)
        app.delete()
        return Response({"success": True, "message": "SaaS app deleted"}, status=status.HTTP_204_NO_CONTENT)
