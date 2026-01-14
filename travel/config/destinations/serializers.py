from rest_framework import serializers
from .models import Destination
from  media.serializers import MediaSerializer

class DestinationSerializer(serializers.ModelSerializer):
    cover_image = MediaSerializer(read_only=True)
    gallery_images = MediaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Destination
        fields = [
            'id', 'name', 'slug', 'country', 'city', 
            'short_description', 'full_description', 
            'cover_image', 'gallery_images', 'latitude', 
            'longitude', 'is_featured', 'created_at'
        ]
        read_only_fields = ['slug', 'created_at']

class DestinationListSerializer(serializers.ModelSerializer):
    cover_image = MediaSerializer(read_only=True)
    
    class Meta:
        model = Destination
        fields = [
            'id', 'name', 'slug', 'country', 'city',
            'short_description', 'cover_image', 'is_featured'
        ]

class DestinationCreateSerializer(serializers.ModelSerializer):
    cover_image_id = serializers.IntegerField(write_only=True, required=False)
    gallery_image_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Destination
        fields = [
            'name', 'country', 'city', 'short_description',
            'full_description', 'cover_image_id', 'gallery_image_ids',
            'latitude', 'longitude', 'is_featured'
        ]
    
    def create(self, validated_data):
        cover_image_id = validated_data.pop('cover_image_id', None)
        gallery_image_ids = validated_data.pop('gallery_image_ids', [])
        
        destination = Destination.objects.create(**validated_data)
        
        if cover_image_id:
            from media.models import Media
            try:
                cover_image = Media.objects.get(id=cover_image_id)
                destination.cover_image = cover_image
            except Media.DoesNotExist:
                pass
        
        if gallery_image_ids:
            from media.models import Media
            gallery_images = Media.objects.filter(id__in=gallery_image_ids)
            destination.gallery_images.set(gallery_images)
        
        destination.save()
        return destination
    
    def update(self, instance, validated_data):
        cover_image_id = validated_data.pop('cover_image_id', None)
        gallery_image_ids = validated_data.pop('gallery_image_ids', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if cover_image_id is not None:
            from media.models import Media
            try:
                cover_image = Media.objects.get(id=cover_image_id)
                instance.cover_image = cover_image
            except Media.DoesNotExist:
                instance.cover_image = None
        
        if gallery_image_ids is not None:
            from media.models import Media
            gallery_images = Media.objects.filter(id__in=gallery_image_ids)
            instance.gallery_images.set(gallery_images)
        
        instance.save()
        return instance