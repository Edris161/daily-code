
from rest_framework import viewsets
from .models import Course, Blog_course
from .serializers import CourseSerializer, Blog_courseSerializer

# -----------------------
# Blog ViewSet
# -----------------------
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


# -----------------------
# Topic ViewSet
# -----------------------
class Blog_courseViewSet(viewsets.ModelViewSet):
    queryset = Blog_course.objects.all()
    serializer_class = Blog_courseSerializer
