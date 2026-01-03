from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import contactViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'contact', contactViewSet)


# Include the router URLs
urlpatterns = [
    path('', include(router.urls)),
]
