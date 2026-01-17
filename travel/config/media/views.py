from rest_framework import generics, permissions, parsers
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .models import Media
from .serializers import MediaSerializer, MediaCreateSerializer
from core.permissions import IsAdmin

class MediaListView(generics.ListAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['file_type']

class UploadMediaView(generics.CreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaCreateSerializer
    permission_classes = [IsAdmin]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        media = serializer.save()
        
        return Response({
            'success': True,
            'message': 'Media uploaded successfully',
            'data': MediaSerializer(media, context={'request': request}).data
        }, status=status.HTTP_201_CREATED)

class DeleteMediaView(generics.DestroyAPIView):
    queryset = Media.objects.all()
    permission_classes = [IsAdmin]
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        
        return Response({
            'success': True,
            'message': 'Media deleted successfully'
        })