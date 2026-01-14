from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from .models import Review
from tours.models import Tour
from .serializers import ReviewSerializer, ReviewCreateSerializer

class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TourReviewsView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        tour_slug = self.kwargs['tour_slug']
        tour = get_object_or_404(Tour, slug=tour_slug)
        return Review.objects.filter(tour=tour).select_related('user')
    
    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        
        # Get tour and calculate stats
        tour_slug = self.kwargs['tour_slug']
        tour = get_object_or_404(Tour, slug=tour_slug)
        
        from django.db.models import Avg, Count
        stats = tour.reviews.aggregate(
            average_rating=Avg('rating'),
            total_reviews=Count('id')
        )
        
        response.data = {
            'tour': {
                'id': tour.id,
                'title': tour.title,
                'slug': tour.slug
            },
            'stats': {
                'average_rating': stats['average_rating'] or 0,
                'total_reviews': stats['total_reviews'] or 0
            },
            'reviews': response.data
        }
        
        return response

class ReviewUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Review.objects.all()
    
    def get_object(self):
        review = super().get_object()
        if review.user != self.request.user and not self.request.user.is_staff:
            raise PermissionDenied("You don't have permission to edit this review")
        return review