from rest_framework import viewsets
from .models import (
    Hero, Hero_List,
    Featured, Featured_list,
    Trusted,
    Experience, Program_services, Achievements, Score
)
from .serializers import (
    HeroSerializer, HeroListSerializer,
    FeaturedSerializer, FeaturedListSerializer,
    TrustedSerializer,
    ExperienceSerializer, ProgramServicesSerializer, AchievementsSerializer, ScoreSerializer
);

# -----------------------
# Hero Section
# -----------------------
class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer


class HeroListViewSet(viewsets.ModelViewSet):
    queryset = Hero_List.objects.all()
    serializer_class = HeroListSerializer


# -----------------------
# Featured Section
# -----------------------
class FeaturedViewSet(viewsets.ModelViewSet):
    queryset = Featured.objects.all()
    serializer_class = FeaturedSerializer


class FeaturedListViewSet(viewsets.ModelViewSet):
    queryset = Featured_list.objects.all()
    serializer_class = FeaturedListSerializer


# -----------------------
# Trusted Section
# -----------------------
class TrustedViewSet(viewsets.ModelViewSet):
    queryset = Trusted.objects.all()
    serializer_class = TrustedSerializer


# -----------------------
# Experience Section
# -----------------------
class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class ProgramServicesViewSet(viewsets.ModelViewSet):
    queryset = Program_services.objects.all()
    serializer_class = ProgramServicesSerializer


class AchievementsViewSet(viewsets.ModelViewSet):
    queryset = Achievements.objects.all()
    serializer_class = AchievementsSerializer


class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
