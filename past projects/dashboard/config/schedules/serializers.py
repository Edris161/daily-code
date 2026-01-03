from rest_framework import serializers
from .models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source="team.name", read_only=True)
    day_name = serializers.CharField(source="get_day_of_week_display", read_only=True)

    class Meta:
        model = Schedule
        fields = "__all__"
