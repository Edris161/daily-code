from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status

from .models import SaaSApp
from .serializers import SaaSAppSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Admins can create/update/delete
    Others can only read
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_staff


class SaaSAppListCreateView(generics.ListCreateAPIView):
    queryset = SaaSApp.objects.all().order_by("-created_at")
    serializer_class = SaaSAppSerializer
    permission_classes = [IsAdminOrReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {
                "success": True,
                "message": "SaaS application created successfully",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class SaaSAppDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SaaSApp.objects.all()
    serializer_class = SaaSAppSerializer
    permission_classes = [IsAdminOrReadOnly]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial
        )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(
            {
                "success": True,
                "message": "SaaS application updated successfully",
                "data": serializer.data,
            }
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        return Response(
            {
                "success": True,
                "message": "SaaS application deleted successfully",
            },
            status=status.HTTP_204_NO_CONTENT,
        )
