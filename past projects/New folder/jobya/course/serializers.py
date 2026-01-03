from rest_framework import serializers
from .models import Course, Blog_course

# -----------------------
# Blog Serializer
# -----------------------
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


# -----------------------
# Topic Serializer
# -----------------------
class Blog_courseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog_course
        fields = '__all__'
