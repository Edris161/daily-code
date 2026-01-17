from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Tour
from .serializers import (
    TourListSerializer, TourDetailSerializer, TourCreateSerializer
)
from .filters import TourFilter
from core.permissions import IsAdmin

class TourListView(generics.ListCreateAPIView):
    queryset = Tour.objects.filter(is_active=True).select_related('destination')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = TourFilter
    search_fields = ['title', 'description', 'destination__name']
    ordering_fields = ['price', 'duration_days', 'created_at']
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        return [permissions.AllowAny()]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TourCreateSerializer
        return TourListSerializer

class TourDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tour.objects.select_related('destination')
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdmin()]
        return [permissions.AllowAny()]
    
    def get_serializer_class(self):
        if self.request.method in ['GET', 'HEAD']:
            return TourDetailSerializer
        return TourCreateSerializer

class ToursByDestinationView(generics.ListAPIView):
    serializer_class = TourListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        destination_slug = self.kwargs['destination_slug']
        return Tour.objects.filter(
            destination__slug=destination_slug,
            is_active=True
        ).select_related('destination')