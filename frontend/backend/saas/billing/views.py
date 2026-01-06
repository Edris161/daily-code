from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Billing
from .serializers import BillingSerializer

class BillingViewSet(ModelViewSet):
    queryset = Billing.objects.all().order_by("-monthly_cost")
    serializer_class = BillingSerializer
    permission_classes = [IsAuthenticated]
