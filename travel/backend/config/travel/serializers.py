from rest_framework import serializers
from .models import Destination, Tour

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = "__all__"


class DestinationSerializer(serializers.ModelSerializer):
    tours = TourSerializer(many=True, read_only=True)

    class Meta:
        model = Destination
        fields = "__all__"
