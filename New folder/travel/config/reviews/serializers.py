from rest_framework import serializers
from .models import Review, TourRating
from accounts.serializers import UserProfileSerializer

class ReviewSerializer(serializers.ModelSerializer):
    user_details = UserProfileSerializer(source='user', read_only=True)
    
    class Meta:
        model = Review
        fields = ('id', 'user', 'user_details', 'tour', 'rating', 
                  'comment', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')
    
    def validate(self, data):
        user = self.context['request'].user
        tour = data.get('tour')
        
        # Check if user has already reviewed this tour
        if Review.objects.filter(user=user, tour=tour).exists():
            raise serializers.ValidationError(
                "You have already reviewed this tour"
            )
        
        # Check if user has booked this tour
        from bookings.models import Booking
        if not Booking.objects.filter(
            user=user, 
            tour=tour, 
            status__in=['CONFIRMED', 'COMPLETED']
        ).exists():
            raise serializers.ValidationError(
                "You must book and complete this tour before reviewing"
            )
        
        return data
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class TourRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourRating
        fields = ('average_rating', 'total_reviews', 'rating_1', 
                  'rating_2', 'rating_3', 'rating_4', 'rating_5', 
                  'last_updated')

class ReviewWithTourSerializer(serializers.ModelSerializer):
    user_details = UserProfileSerializer(source='user', read_only=True)
    
    class Meta:
        model = Review
        fields = ('id', 'user_details', 'rating', 'comment', 'created_at')