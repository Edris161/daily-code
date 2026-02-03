from rest_framework import serializers
from .models import Destination, DestinationImage
from django.utils.text import slugify
class DestinationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationImage
        fields = ('id', 'image', 'alt_text', 'uploaded_at')

class DestinationListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Destination
        fields = ('id', 'name', 'slug', 'country', 'city', 
                  'short_description', 'image_url', 'is_featured')
    
    def get_image_url(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None

class DestinationDetailSerializer(serializers.ModelSerializer):
    gallery_images = DestinationImageSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Destination
        fields = ('id', 'name', 'slug', 'country', 'city', 
                  'short_description', 'full_description', 
                  'image_url', 'gallery_images', 'latitude', 
                  'longitude', 'is_featured', 'created_at')
    
    def get_image_url(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None

class DestinationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ('name', 'country', 'city', 'short_description', 
                  'full_description', 'cover_image', 'latitude', 
                  'longitude', 'is_featured')
        

class DestinationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ('name', 'country', 'city', 'short_description', 
                  'full_description', 'cover_image', 'latitude', 
                  'longitude', 'is_featured')
    
    def validate(self, data):
        # Check if destination with same name and country exists
        name = data.get('name')
        country = data.get('country')
        
        if Destination.objects.filter(
            name__iexact=name, 
            country__iexact=country
        ).exists():
            raise serializers.ValidationError(
                f"Destination '{name}' in {country} already exists."
            )
        return data