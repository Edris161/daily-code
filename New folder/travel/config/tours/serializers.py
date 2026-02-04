from rest_framework import serializers
from .models import Tour, TourGallery
from destinations.serializers import DestinationListSerializer
from media.serializers import MediaSerializer

class TourGallerySerializer(serializers.ModelSerializer):
    """Serializer for tour gallery images"""
    image = MediaSerializer(read_only=True)
    
    class Meta:
        model = TourGallery
        fields = ['id', 'image', 'order', 'created_at']

class TourSerializer(serializers.ModelSerializer):
    """Serializer for Tour model"""
    destination = DestinationListSerializer(read_only=True)
    gallery = TourGallerySerializer(
        source='gallery_images', 
        many=True, 
        read_only=True
    )
    available_spots = serializers.IntegerField(read_only=True)
    average_rating = serializers.DecimalField(
        max_digits=3, 
        decimal_places=2, 
        read_only=True
    )
    review_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Tour
        fields = [
            'id', 'destination', 'title', 'slug', 'description',
            'duration_days', 'price', 'currency', 'max_people',
            'available_spots', 'start_dates', 'included_services',
            'excluded_services', 'gallery', 'is_active',
            'average_rating', 'review_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']

class TourListSerializer(serializers.ModelSerializer):
    """Serializer for tour listing (optimized)"""
    destination = DestinationListSerializer(read_only=True)
    available_spots = serializers.IntegerField(read_only=True)
    average_rating = serializers.DecimalField(
        max_digits=3, 
        decimal_places=2, 
        read_only=True
    )
    
    class Meta:
        model = Tour
        fields = [
            'id', 'destination', 'title', 'slug', 'description',
            'duration_days', 'price', 'currency', 'max_people',
            'available_spots', 'is_active', 'average_rating',
            'created_at'
        ]