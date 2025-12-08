from rest_framework import serializers
from .models import contact

# -----------------------
# Blog Serializer
# -----------------------
class contactSerializer(serializers.ModelSerializer):
    class Meta:
        model = contact
        fields = '__all__'


 