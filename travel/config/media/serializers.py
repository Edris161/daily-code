from rest_framework import serializers
from .models import Media

class MediaSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file_type = serializers.CharField(read_only=True)
    
    class Meta:
        model = Media
        fields = ('id', 'file', 'file_url', 'file_type', 'alt_text', 'created_at')
        read_only_fields = ('id', 'file_url', 'file_type', 'created_at')
    
    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None

class MediaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ('file', 'alt_text')