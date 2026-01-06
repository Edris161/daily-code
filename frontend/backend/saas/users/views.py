from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from .models import User
from .serializers import UserSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
