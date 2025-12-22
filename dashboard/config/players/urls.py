from rest_framework.routers import DefaultRouter
from players.views import PlayerViewSet
from teams.views import TeamViewSet
from django.urls import path, include
from django.contrib import admin

router = DefaultRouter()
router.register(r"teams", TeamViewSet)
router.register(r"players", PlayerViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
