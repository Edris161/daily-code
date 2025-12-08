from rest_framework import serializers
from .models import adu_partners, feature
# -----------------------
# Blog Serializer
# -----------------------
class adu_partnersSerializer(serializers.ModelSerializer):
    class Meta:
        model = adu_partners
        fields = '__all__'


# -----------------------



class featureSerializer(serializers.ModelSerializer):
    class Meta:
        model = feature
        fields = '__all__'