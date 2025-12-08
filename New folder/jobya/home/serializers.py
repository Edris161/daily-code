from rest_framework import serializers
from .models import (
    Hero, Hero_List,
    Featured, Featured_list,
    Trusted,
    Experience, Program_services, Achievements, Score
)

# -----------------------
# Hero Section
# -----------------------
class HeroListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero_List
        fields = '__all__'


class HeroSerializer(serializers.ModelSerializer):
    hero_list = HeroListSerializer(many=True, read_only=True, source='hero_list_set')

    class Meta:
        model = Hero
        fields = '__all__'


# -----------------------
# Featured Section
# -----------------------
class FeaturedListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Featured_list
        fields = '__all__'


class FeaturedSerializer(serializers.ModelSerializer):
    featured_list = FeaturedListSerializer(many=True, read_only=True, source='featured_list_set')

    class Meta:
        model = Featured
        fields = '__all__'


# -----------------------
# Trusted Section
# -----------------------
class TrustedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trusted
        fields = '__all__'


# -----------------------
# Experience Section
# -----------------------
class ProgramServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program_services
        fields = '__all__'


class AchievementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievements
        fields = '__all__'


class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    program_services = ProgramServicesSerializer(many=True, read_only=True, source='program_services_set')
    achievements = AchievementsSerializer(many=True, read_only=True, source='achievements_set')
    scores = ScoreSerializer(many=True, read_only=True, source='score_set')

    class Meta:
        model = Experience
        fields = '__all__'



