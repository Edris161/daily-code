from rest_framework.viewsets import ModelViewSet
from .models import Fee
from .serializers import FeeSerializer


class FeeViewSet(ModelViewSet):
    queryset = Fee.objects.select_related("player").all()
    serializer_class = FeeSerializer
