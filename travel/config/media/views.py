from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Media
from .serializers import MediaSerializer, MediaUploadSerializer

class MediaUploadView(generics.CreateAPIView):
    serializer_class = MediaUploadSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]
    
    def perform_create(self, serializer):
        # Pass the request user to the model save method
        media = serializer.save()
        media._request_user = self.request.user
        media.save()

class MediaListView(generics.ListAPIView):
    serializer_class = MediaSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    
    def get_queryset(self):
        return Media.objects.all().order_by('-uploaded_at')

class MediaDeleteView(generics.DestroyAPIView):
    queryset = Media.objects.all()
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Check if media is being used
        from destinations.models import Destination
        from tours.models import Tour
        
        is_used_as_cover = Destination.objects.filter(cover_image=instance).exists()
        is_used_in_gallery = instance.destination_galleries.exists()
        
        if is_used_as_cover or is_used_in_gallery:
            return Response(
                {"error": "Cannot delete media that is being used"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)