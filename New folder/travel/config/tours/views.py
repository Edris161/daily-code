from rest_framework import generics, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count
from .models import Tour
from .serializers import TourSerializer, TourListSerializer
from .filters import TourFilter

class TourListView(generics.ListAPIView):
    """List all tours with filtering and pagination"""
    queryset = Tour.objects.select_related('destination').filter(is_active=True)
    serializer_class = TourListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = TourFilter
    search_fields = ['title', 'description', 'destination__name']
    ordering_fields = ['price', 'duration_days', 'created_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Annotate with average rating
        return queryset.annotate(
            average_rating=Avg('reviews__rating'),
            review_count=Count('reviews')
        )

class TourDetailView(generics.RetrieveAPIView):
    """Get tour detail by slug"""
    queryset = Tour.objects.select_related('destination').prefetch_related(
        'gallery_images__image'
    ).filter(is_active=True)
    serializer_class = TourSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'
    
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.annotate(
            average_rating=Avg('reviews__rating'),
            review_count=Count('reviews')
        )

class ToursByDestinationView(generics.ListAPIView):
    """List tours by destination slug"""
    serializer_class = TourListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = TourFilter
    
    def get_queryset(self):
        destination_slug = self.kwargs['destination_slug']
        return Tour.objects.filter(
            destination__slug=destination_slug,
            is_active=True
        ).select_related('destination').annotate(
            average_rating=Avg('reviews__rating'),
            review_count=Count('reviews')
        )