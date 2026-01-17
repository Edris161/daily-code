from rest_framework import serializers
from .models import Tour
from destinations.serializers import DestinationListSerializer

class TourListSerializer(serializers.ModelSerializer):
    destination = DestinationListSerializer(read_only=True)
    available_seats = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Tour
        fields = ('id', 'title', 'slug', 'destination', 'duration_days', 
                  'price', 'currency', 'available_seats', 'is_active')

class TourDetailSerializer(serializers.ModelSerializer):
    destination = DestinationListSerializer(read_only=True)
    available_seats = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Tour
        fields = ('id', 'title', 'slug', 'destination', 'description', 
                  'duration_days', 'price', 'currency', 'max_people', 
                  'available_seats', 'start_dates', 'included_services', 
                  'excluded_services', 'is_active', 'created_at')

class TourCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ('destination', 'title', 'description', 'duration_days', 
                  'price', 'currency', 'max_people', 'start_dates', 
                  'included_services', 'excluded_services', 'is_active')