from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Media
from .serializers import (
    MediaSerializer, 
    MediaUploadSerializer,
    MediaUpdateSerializer
)
from .permissions import IsOwnerOrAdmin, CanUploadMedia

class MediaListView(generics.ListAPIView):
    """List all media files"""
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['file_type', 'uploaded_by']
    
    def get_queryset(self):
        """Filter queryset based on user role"""
        user = self.request.user
        
        if user.is_authenticated:
            if user.is_staff_member:
                return Media.objects.all()
            else:
                return Media.objects.filter(uploaded_by=user)
        else:
            # Return empty queryset for anonymous users
            return Media.objects.none()

class MediaUploadView(generics.CreateAPIView):
    """Upload media file"""
    queryset = Media.objects.all()
    serializer_class = MediaUploadSerializer
    permission_classes = [CanUploadMedia]
    
    def perform_create(self, serializer):
        """Save with uploaded_by user"""
        serializer.save(uploaded_by=self.request.user)

class MediaDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete media"""
    queryset = Media.objects.all()
    permission_classes = [IsOwnerOrAdmin]
    
    def get_serializer_class(self):
        """Return appropriate serializer based on HTTP method"""
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return MediaUpdateSerializer
        return MediaSerializer
    
    def destroy(self, request, *args, **kwargs):
        """Delete media file"""
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"detail": "Media file deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )

class UserMediaView(generics.ListAPIView):
    """Get user's uploaded media"""
    serializer_class = MediaSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Media.objects.filter(
            uploaded_by=self.request.user
        ).order_by('-uploaded_at')

class MediaStatsView(APIView):
    """Get media statistics"""
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request):
        stats = {
            'total_files': Media.objects.count(),
            'total_size_kb': sum(m.file_size for m in Media.objects.all()),
            'by_type': {}
        }
        
        # Get count by file type
        for media in Media.objects.all():
            file_type = media.file_type
            if file_type not in stats['by_type']:
                stats['by_type'][file_type] = 0
            stats['by_type'][file_type] += 1
        
        return Response(stats)