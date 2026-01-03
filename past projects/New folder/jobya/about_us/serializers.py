from rest_framework import serializers
from .models import about_us, history, team, stuff
# -----------------------
# Blog Serializer
# -----------------------
class about_usSerializer(serializers.ModelSerializer):
    class Meta:
        model = about_us
        fields = '__all__'


# -----------------------
# Topic Serializer
# -----------------------
class historySerializer(serializers.ModelSerializer):
    class Meta:
        model = history
        fields = '__all__'


class teamySerializer(serializers.ModelSerializer):
    class Meta:
        model = team
        fields = '__all__'


class stuffSerializer(serializers.ModelSerializer):
    class Meta:
        model = stuff
        fields = '__all__'



