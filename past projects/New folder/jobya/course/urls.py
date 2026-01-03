from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, Blog_courseViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'course', CourseViewSet)
router.register(r'blog_course', Blog_courseViewSet)

# Include the router URLs
urlpatterns = [
    path('', include(router.urls)),
]
