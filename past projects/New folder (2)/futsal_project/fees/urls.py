from rest_framework.routers import DefaultRouter
from .views import FeePlanViewSet, PlayerFeeViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r'feeplans', FeePlanViewSet, basename='feeplan')
router.register(r'playerfees', PlayerFeeViewSet, basename='playerfee')
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = router.urls
