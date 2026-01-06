from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SaaSAppViewSet

router = DefaultRouter()
router.register("apps", SaaSAppViewSet, basename="saas-app")

urlpatterns = [
    path("", include(router.urls)),
]
