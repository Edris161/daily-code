from rest_framework import generics, filters, permissions
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Destination
from .serializers import (
    DestinationListSerializer, DestinationDetailSerializer,
    DestinationCreateSerializer
)
from .filters import DestinationFilter
from core.permissions import IsAdmin

class DestinationListView(generics.ListCreateAPIView):
    queryset = Destination.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = DestinationFilter
    search_fields = ['name', 'country', 'city', 'short_description']
    ordering_fields = ['name', 'created_at']
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        return [permissions.AllowAny()]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DestinationCreateSerializer
        return DestinationListSerializer

class DestinationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Destination.objects.all()
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdmin()]
        return [permissions.AllowAny()]
    
    def get_serializer_class(self):
        if self.request.method in ['GET', 'HEAD']:
            return DestinationDetailSerializer
        return DestinationCreateSerializer

class FeaturedDestinationsView(generics.ListAPIView):
    queryset = Destination.objects.filter(is_featured=True)[:6]
    serializer_class = DestinationListSerializer
    permission_classes = [permissions.AllowAny]