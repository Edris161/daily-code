from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count

from core import models
from .models import Review
from .serializers import ReviewSerializer, ReviewListSerializer
from tours.models import Tour

class CreateReviewView(generics.CreateAPIView):
    """Create a new review"""
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        """Save review with tour from URL"""
        tour_slug = self.kwargs.get('tour_slug')
        tour = get_object_or_404(Tour, slug=tour_slug)
        serializer.save(tour=tour)

class TourReviewsView(generics.ListAPIView):
    """Get reviews for a specific tour"""
    serializer_class = ReviewListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        tour_slug = self.kwargs.get('tour_slug')
        tour = get_object_or_404(Tour, slug=tour_slug)
        return Review.objects.filter(tour=tour).select_related('user').order_by('-created_at')
    
    def list(self, request, *args, **kwargs):
        """Return reviews with rating statistics"""
        queryset = self.filter_queryset(self.get_queryset())
        
        # Calculate rating statistics
        rating_stats = queryset.aggregate(
            average_rating=Avg('rating'),
            total_reviews=Count('id')
        )
        
        # Get reviews
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                'results': serializer.data,
                'statistics': rating_stats
            })
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'reviews': serializer.data,
            'statistics': rating_stats
        })

class UserReviewsView(generics.ListAPIView):
    """Get user's reviews"""
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Review.objects.filter(
            user=self.request.user
        ).select_related('tour', 'tour__destination').order_by('-created_at')

class UpdateReviewView(generics.UpdateAPIView):
    """Update a review"""
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)

class DeleteReviewView(generics.DestroyAPIView):
    """Delete a review"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)

class ReviewStatsView(APIView):
    """Get review statistics for a tour"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, tour_slug):
        tour = get_object_or_404(Tour, slug=tour_slug)
        
        # Get rating distribution
        distribution = {}
        for i in range(1, 6):
            distribution[i] = tour.reviews.filter(rating=i).count()
        
        # Get statistics
        stats = tour.reviews.aggregate(
            average_rating=Avg('rating'),
            total_reviews=Count('id'),
            five_star=Count('id', filter=models.Q(rating=5)),
            four_star=Count('id', filter=models.Q(rating=4)),
            three_star=Count('id', filter=models.Q(rating=3)),
            two_star=Count('id', filter=models.Q(rating=2)),
            one_star=Count('id', filter=models.Q(rating=1))
        )
        
        return Response({
            'tour_id': tour.id,
            'tour_title': tour.title,
            'statistics': stats,
            'distribution': distribution
        })