from rest_framework.routers import DefaultRouter
from players.views import PlayerViewSet
from teams.views import TeamViewSet
from django.contrib import admin
from django.urls import path, include
from fees.views import FeeViewSet
from schedules.views import ScheduleViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)




router = DefaultRouter()
router.register(r"teams", TeamViewSet)
router.register(r"players", PlayerViewSet)

router.register(
    r"schedules",
    ScheduleViewSet,
    basename="schedule"
)
router.register(r"fees", FeeViewSet)

   

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
     path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
