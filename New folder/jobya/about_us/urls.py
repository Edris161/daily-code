from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import about_usViewSet, historyViewSet, teamViewSet, stuffViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'about_us', about_usViewSet)
router.register(r'history', historyViewSet)
router.register(r'team', teamViewSet)
router.register(r'stuff', stuffViewSet)

# Include the router URLs
urlpatterns = [
    path('', include(router.urls)),
]
