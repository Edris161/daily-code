from rest_framework import serializers
from .models import Fee


class FeeSerializer(serializers.ModelSerializer):
    player_name = serializers.CharField(source="player.name", read_only=True)

    class Meta:
        model = Fee
        fields = "__all__"
