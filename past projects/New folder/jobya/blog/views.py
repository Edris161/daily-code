
from rest_framework import viewsets
from .models import Blog, Topic
from .serializers import BlogSerializer, TopicSerializer

# -----------------------
# Blog ViewSet
# -----------------------
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


# -----------------------
# Topic ViewSet
# -----------------------
class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
