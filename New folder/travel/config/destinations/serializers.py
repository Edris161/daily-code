from rest_framework import serializers
from .models import Destination, DestinationGallery
from media.serializers import MediaSerializer

class DestinationGallerySerializer(serializers.ModelSerializer):
    """Serializer for destination gallery images"""
    image = MediaSerializer(read_only=True)
    
    class Meta:
        model = DestinationGallery
        fields = ['id', 'image', 'order', 'created_at']

class DestinationSerializer(serializers.ModelSerializer):
    """Serializer for Destination model"""
    cover_image = MediaSerializer(read_only=True)
    gallery = DestinationGallerySerializer(
        source='gallery_images', 
        many=True, 
        read_only=True
    )
    
    class Meta:
        model = Destination
        fields = [
            'id', 'name', 'slug', 'country', 'city',
            'short_description', 'full_description',
            'cover_image', 'gallery', 'latitude', 'longitude',
            'is_featured', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']

class DestinationListSerializer(serializers.ModelSerializer):
    """Serializer for destination listing (optimized)"""
    cover_image = MediaSerializer(read_only=True)
    
    class Meta:
        model = Destination
        fields = [
            'id', 'name', 'slug', 'country', 'city',
            'short_description', 'cover_image',
            'is_featured', 'created_at'
        ]