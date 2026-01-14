from rest_framework import generics, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Destination
from .serializers import (
    DestinationSerializer,
    DestinationListSerializer,
    DestinationCreateSerializer
)
from .filters import DestinationFilter

class DestinationListView(generics.ListAPIView):
    serializer_class = DestinationListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = DestinationFilter
    search_fields = ['name', 'country', 'city', 'short_description']
    ordering_fields = ['name', 'country', 'created_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = Destination.objects.all()
        
        # Filter featured destinations
        featured = self.request.query_params.get('featured', None)
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        return queryset.select_related('cover_image')

class FeaturedDestinationsView(generics.ListAPIView):
    serializer_class = DestinationListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        return Destination.objects.filter(is_featured=True).select_related('cover_image')

class DestinationDetailView(generics.RetrieveAPIView):
    serializer_class = DestinationSerializer
    lookup_field = 'slug'
    queryset = Destination.objects.all()
    
    def get_queryset(self):
        return Destination.objects.prefetch_related(
            'cover_image', 
            'gallery_images'
        )

class DestinationCreateView(generics.CreateAPIView):
    serializer_class = DestinationCreateSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

class DestinationUpdateView(generics.UpdateAPIView):
    serializer_class = DestinationCreateSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    lookup_field = 'slug'
    queryset = Destination.objects.all()