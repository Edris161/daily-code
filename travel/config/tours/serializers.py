from rest_framework import serializers
from .models import Tour
from destinations.serializers import DestinationListSerializer
from datetime import datetime

class TourSerializer(serializers.ModelSerializer):
    destination = DestinationListSerializer(read_only=True)
    average_rating = serializers.SerializerMethodField()
    total_reviews = serializers.SerializerMethodField()
    
    class Meta:
        model = Tour
        fields = [
            'id', 'destination', 'title', 'slug', 'description',
            'duration_days', 'price', 'currency', 'max_people',
            'start_dates', 'included_services', 'excluded_services',
            'is_active', 'average_rating', 'total_reviews', 'created_at'
        ]
        read_only_fields = ['slug', 'created_at']
    
    def get_average_rating(self, obj):
        return obj.average_rating()
    
    def get_total_reviews(self, obj):
        return obj.total_reviews()

class TourListSerializer(serializers.ModelSerializer):
    destination = DestinationListSerializer(read_only=True)
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Tour
        fields = [
            'id', 'destination', 'title', 'slug', 'description',
            'duration_days', 'price', 'currency', 'average_rating',
            'is_active'
        ]
    
    def get_average_rating(self, obj):
        return obj.average_rating()

class TourCreateSerializer(serializers.ModelSerializer):
    destination_slug = serializers.SlugRelatedField(
        source='destination',
        queryset=Tour.objects.all(),
        slug_field='slug',
        write_only=True
    )
    
    class Meta:
        model = Tour
        fields = [
            'destination_slug', 'title', 'description', 'duration_days',
            'price', 'currency', 'max_people', 'start_dates',
            'included_services', 'excluded_services', 'is_active'
        ]
    
    def validate_start_dates(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("start_dates must be a list")
        
        for date_str in value:
            try:
                datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            except ValueError:
                raise serializers.ValidationError(f"Invalid date format: {date_str}")
        
        return value
    
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than 0")
        return value
    
    def validate_duration_days(self, value):
        if value <= 0:
            raise serializers.ValidationError("Duration must be at least 1 day")
        return value