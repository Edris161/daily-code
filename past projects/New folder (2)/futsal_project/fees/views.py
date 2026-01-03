from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import FeePlan, PlayerFee, Payment
from .serializers import FeePlanSerializer, PlayerFeeSerializer, PaymentSerializer

class FeePlanViewSet(ModelViewSet):
    queryset = FeePlan.objects.all().order_by('-id')
    serializer_class = FeePlanSerializer
    permission_classes = []  # set IsAuthenticated later

class PlayerFeeViewSet(ModelViewSet):
    queryset = PlayerFee.objects.select_related('player','fee_plan').all()
    serializer_class = PlayerFeeSerializer
    permission_classes = []

class PaymentViewSet(ModelViewSet):
    queryset = Payment.objects.select_related('player_fee','player_fee__player').all()
    serializer_class = PaymentSerializer
    permission_classes = []
