from rest_framework import serializers
from .models import Media

class MediaSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_type = serializers.SerializerMethodField()
    file_size = serializers.SerializerMethodField()
    
    class Meta:
        model = Media
        fields = ['id', 'file', 'file_url', 'alt_text', 'file_type', 'file_size', 'uploaded_at']
        read_only_fields = ['file_type', 'file_size', 'uploaded_at']
    
    def get_file_url(self, obj):
        request = self.context.get('request')
        if request and obj.file:
            return request.build_absolute_uri(obj.file.url)
        return obj.file.url if obj.file else None
    
    def get_file_type(self, obj):
        return obj.file_type
    
    def get_file_size(self, obj):
        return round(obj.file_size, 2)  # Round to 2 decimal places

class MediaUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['file', 'alt_text']
    
    def validate_file(self, value):
        # File size validation (max 10MB)
        max_size = 10 * 1024 * 1024  # 10MB
        if value.size > max_size:
            raise serializers.ValidationError("File size cannot exceed 10MB")
        return value