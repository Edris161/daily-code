from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Player
from .serializers import PlayerSerializer

class PlayerViewSet(ModelViewSet):
    queryset = Player.objects.all().order_by('-id')
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated]
