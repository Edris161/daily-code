from rest_framework import serializers
from .models import Blog, Topic

# -----------------------
# Blog Serializer
# -----------------------
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'


# -----------------------
# Topic Serializer
# -----------------------
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'
