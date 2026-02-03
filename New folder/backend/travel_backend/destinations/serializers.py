from rest_framework import serializers
from .models import Destination


class DestinationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = [
            'id',
            'name',
            'slug',
            'country',
            'city',
            'short_description',
            'cover_image',
            'is_featured',
        ]


class DestinationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'
