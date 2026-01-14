from rest_framework import generics, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from .models import Tour
from .serializers import (
    TourSerializer,
    TourListSerializer,
    TourCreateSerializer
)
from destinations.models import Destination
from .filters import TourFilter

class TourListView(generics.ListAPIView):
    serializer_class = TourListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = TourFilter
    search_fields = ['title', 'description', 'destination__name']
    ordering_fields = ['price', 'duration_days', 'created_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = Tour.objects.filter(is_active=True).select_related('destination')
        
        # Add average rating annotation
        from django.db.models import Avg, Count
        queryset = queryset.annotate(
            avg_rating=Avg('reviews__rating'),
            review_count=Count('reviews')
        )
        
        return queryset

class TourDetailView(generics.RetrieveAPIView):
    serializer_class = TourSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Tour.objects.filter(is_active=True).select_related('destination')
        
        # Add average rating annotation
        from django.db.models import Avg, Count
        queryset = queryset.annotate(
            avg_rating=Avg('reviews__rating'),
            review_count=Count('reviews')
        )
        
        return queryset

class TourByDestinationView(generics.ListAPIView):
    serializer_class = TourListSerializer
    
    def get_queryset(self):
        destination_slug = self.kwargs['destination_slug']
        destination = get_object_or_404(Destination, slug=destination_slug)
        
        queryset = Tour.objects.filter(
            destination=destination,
            is_active=True
        ).select_related('destination')
        
        # Add average rating annotation
        from django.db.models import Avg, Count
        queryset = queryset.annotate(
            avg_rating=Avg('reviews__rating'),
            review_count=Count('reviews')
        )
        
        return queryset

class TourCreateView(generics.CreateAPIView):
    serializer_class = TourCreateSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

class TourUpdateView(generics.UpdateAPIView):
    serializer_class = TourCreateSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    lookup_field = 'slug'
    queryset = Tour.objects.all()