from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, TopicViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'blogs', BlogViewSet)
router.register(r'topics', TopicViewSet)

# Include the router URLs
urlpatterns = [
    path('', include(router.urls)),
]
