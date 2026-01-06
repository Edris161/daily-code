from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import SaaSApp
from .serializers import SaaSAppSerializer

class SaaSAppViewSet(ModelViewSet):
    queryset = SaaSApp.objects.all().order_by("-created_at")
    serializer_class = SaaSAppSerializer
    permission_classes = [IsAuthenticated]
