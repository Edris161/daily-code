from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    WalletViewSet,
    TransactionViewSet,
    PayoutRequestViewSet,
    OrderViewSet,
    FinancialAlertViewSet,
)

router = DefaultRouter()
router.register(r'wallets', WalletViewSet, basename='wallet')
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'payout-requests', PayoutRequestViewSet, basename='payout')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'alerts', FinancialAlertViewSet, basename='alert')

urlpatterns = [
    path('api/', include(router.urls)),
]
