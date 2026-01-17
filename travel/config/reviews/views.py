from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Review, TourRating
from .serializers import (
    ReviewSerializer, TourRatingSerializer, ReviewWithTourSerializer
)
from core.permissions import IsOwnerOrAdmin

class CreateReviewView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        review = serializer.save()
        
        # Update tour rating stats
        tour_rating, created = TourRating.objects.get_or_create(tour=review.tour)
        tour_rating.update_stats()
        
        return Response({
            'success': True,
            'message': 'Review submitted successfully',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

class TourReviewsView(generics.ListAPIView):
    serializer_class = ReviewWithTourSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['rating']
    
    def get_queryset(self):
        tour_slug = self.kwargs['tour_slug']
        from tours.models import Tour
        try:
            tour = Tour.objects.get(slug=tour_slug)
            return Review.objects.filter(tour=tour).select_related('user')
        except Tour.DoesNotExist:
            return Review.objects.none()

class UserReviewsView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Review.objects.filter(user=self.request.user).select_related('tour')

class TourRatingView(generics.RetrieveAPIView):
    serializer_class = TourRatingSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'tour__slug'
    lookup_url_kwarg = 'tour_slug'
    
    def get_queryset(self):
        return TourRating.objects.all()