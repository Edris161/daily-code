from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProgramViewSet, CardViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'program', ProgramViewSet)
router.register(r'card', CardViewSet)

# Include the router URLs
urlpatterns = [
    path('', include(router.urls)),
]
