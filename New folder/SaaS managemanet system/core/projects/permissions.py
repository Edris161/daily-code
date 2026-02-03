from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Project


class IsProjectOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class ProjectDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsProjectOwner]

    def delete(self, request, pk):
        project = Project.objects.get(pk=pk)
        self.check_object_permissions(request, project)
        project.delete()
        return Response(status=204)
