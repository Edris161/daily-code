from rest_framework import generics, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from .models import Destination
from .serializers import DestinationSerializer, DestinationListSerializer
from .filters import DestinationFilter

class DestinationListView(generics.ListAPIView):
    """List all destinations with filtering and pagination"""
    queryset = Destination.objects.select_related('cover_image').all()
    serializer_class = DestinationListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = DestinationFilter
    search_fields = ['name', 'country', 'city', 'short_description']
    ordering_fields = ['name', 'country', 'created_at']
    ordering = ['-created_at']

class FeaturedDestinationsView(generics.ListAPIView):
    """List featured destinations"""
    queryset = Destination.objects.filter(
        is_featured=True
    ).select_related('cover_image').all()
    serializer_class = DestinationListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        return super().get_queryset()[:8]  # Limit to 8 featured destinations

class DestinationDetailView(generics.RetrieveAPIView):
    """Get destination detail by slug"""
    queryset = Destination.objects.select_related('cover_image').prefetch_related(
        'gallery_images__image'
    ).all()
    serializer_class = DestinationSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'