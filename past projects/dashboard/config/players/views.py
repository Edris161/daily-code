from rest_framework.viewsets import ModelViewSet
from .models import Player
from .serializers import PlayerSerializer


class PlayerViewSet(ModelViewSet):
    queryset = Player.objects.select_related("team").all()
    serializer_class = PlayerSerializer
