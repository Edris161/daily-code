from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Subscription
from .serializers import SubscriptionSerializer

class SubscriptionViewSet(ModelViewSet):
    queryset = Subscription.objects.all().order_by("renewal_date")
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]
