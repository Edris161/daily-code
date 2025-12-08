from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HeroViewSet, HeroListViewSet,
    FeaturedViewSet, FeaturedListViewSet,
    TrustedViewSet,
    ExperienceViewSet, ProgramServicesViewSet, AchievementsViewSet, ScoreViewSet
)

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'heroes', HeroViewSet)
router.register(r'hero-lists', HeroListViewSet)

router.register(r'featured', FeaturedViewSet)
router.register(r'featured-lists', FeaturedListViewSet)

router.register(r'trusted', TrustedViewSet)

router.register(r'experiences', ExperienceViewSet)
router.register(r'program-services', ProgramServicesViewSet)
router.register(r'achievements', AchievementsViewSet)
router.register(r'scores', ScoreViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
