from rest_framework import serializers
from .models import Media

class MediaSerializer(serializers.ModelSerializer):
    """Serializer for Media model"""
    file_url = serializers.SerializerMethodField()
    file_size_kb = serializers.SerializerMethodField()
    
    class Meta:
        model = Media
        fields = [
            'id', 'file', 'file_url', 'alt_text',
            'file_size_kb', 'file_type', 'uploaded_by',
            'uploaded_at'
        ]
        read_only_fields = [
            'id', 'file_url', 'file_size_kb', 
            'file_type', 'uploaded_by', 'uploaded_at'
        ]
    
    def get_file_url(self, obj):
        """Get absolute URL for the file"""
        request = self.context.get('request')
        if request and obj.file:
            return request.build_absolute_uri(obj.file.url)
        return None
    
    def get_file_size_kb(self, obj):
        """Get file size in KB"""
        return round(obj.file_size, 2) if obj.file_size else 0

class MediaUploadSerializer(serializers.ModelSerializer):
    """Serializer for media upload"""
    class Meta:
        model = Media
        fields = ['file', 'alt_text']
    
    def create(self, validated_data):
        """Create media with uploaded_by user"""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['uploaded_by'] = request.user
        return super().create(validated_data)

class MediaUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating media"""
    class Meta:
        model = Media
        fields = ['alt_text']