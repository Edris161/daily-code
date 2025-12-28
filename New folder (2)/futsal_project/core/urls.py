from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, PlayerViewSet, FeePlanViewSet, PlayerFeeViewSet, PaymentViewSet
from .views import DashboardSummaryAPIView

router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'feeplans', FeePlanViewSet)
router.register(r'playerfees', PlayerFeeViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
	path("reports/summary/", DashboardSummaryAPIView.as_view()),
] + router.urls
