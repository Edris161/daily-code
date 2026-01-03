from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import adu_partnersViewSet, featureViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'adu_partners', adu_partnersViewSet)
router.register(r'feature', featureViewSet)
# Include the router URLs
urlpatterns = [
    path('', include(router.urls)),
]
