from rest_framework import serializers
from django.db import IntegrityError
from .models import Review
from accounts.serializers import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    """Serializer for Review model"""
    user = UserSerializer(read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    
    class Meta:
        model = Review
        fields = [
            'id', 'user', 'user_email', 'user_name', 'tour', 'rating',
            'comment', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']
        extra_kwargs = {
            'tour': {'write_only': True}
        }
    
    def validate(self, data):
        """Validate review data"""
        request = self.context.get('request')
        tour = data.get('tour')
        
        # Check if user already reviewed this tour
        if request and request.user.is_authenticated:
            if Review.objects.filter(user=request.user, tour=tour).exists():
                raise serializers.ValidationError(
                    "You have already reviewed this tour."
                )
        
        # Check if user has booked this tour
        if request and request.user.is_authenticated:
            has_booking = tour.bookings.filter(
                user=request.user, 
                status='COMPLETED'
            ).exists()
            if not has_booking and not request.user.is_staff_member:
                raise serializers.ValidationError(
                    "You can only review tours you have completed."
                )
        
        return data
    
    def create(self, validated_data):
        """Create review with user from request"""
        request = self.context.get('request')
        try:
            validated_data['user'] = request.user
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError(
                "You have already reviewed this tour."
            )

class ReviewListSerializer(serializers.ModelSerializer):
    """Serializer for review listing"""
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    
    class Meta:
        model = Review
        fields = [
            'id', 'user_name', 'rating', 'comment',
            'created_at'
        ]