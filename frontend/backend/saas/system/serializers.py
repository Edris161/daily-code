from rest_framework import serializers
from .models import SaaSApp

class SaaSAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaaSApp
        fields = "__all__"
