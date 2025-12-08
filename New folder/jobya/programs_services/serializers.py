from rest_framework import serializers
from .models import Program, Card
# -----------------------
# Blog Serializer
# -----------------------
class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


# -----------------------
# Topic Serializer
# -----------------------
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'
