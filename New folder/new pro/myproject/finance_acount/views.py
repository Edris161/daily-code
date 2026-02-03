from rest_framework import viewsets, permissions
from .models import Wallet, Transaction, PayoutRequest, Order, FinancialAlert
from .serializers import (
    WalletSerializer,
    TransactionSerializer,
    PayoutRequestSerializer,
    OrderSerializer,
    FinancialAlertSerializer,
)


class WalletViewSet(viewsets.ModelViewSet):
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(wallet__user=self.request.user)


class PayoutRequestViewSet(viewsets.ModelViewSet):
    serializer_class = PayoutRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PayoutRequest.objects.filter(wallet__user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


class FinancialAlertViewSet(viewsets.ModelViewSet):
    queryset = FinancialAlert.objects.all()
    serializer_class = FinancialAlertSerializer
    permission_classes = [permissions.IsAdminUser]
