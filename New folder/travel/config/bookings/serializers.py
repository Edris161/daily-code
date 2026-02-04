from rest_framework import serializers
from django.utils import timezone
from .models import Booking
from tours.serializers import TourListSerializer

class BookingSerializer(serializers.ModelSerializer):
    """Serializer for Booking model"""
    tour = TourListSerializer(read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    can_be_cancelled = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'tour', 'user', 'user_email', 'full_name', 'email',
            'phone', 'number_of_people', 'preferred_date',
            'special_requests', 'status', 'total_amount',
            'booking_reference', 'can_be_cancelled',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'status', 'total_amount', 'booking_reference',
            'created_at', 'updated_at', 'user'
        ]
    
    def validate(self, data):
        """Validate booking data"""
        tour = self.context['view'].get_tour()
        
        # Check if tour is active
        if not tour.is_active:
            raise serializers.ValidationError("This tour is not available for booking.")
        
        # Check availability
        available_spots = tour.available_spots
        if data['number_of_people'] > available_spots:
            raise serializers.ValidationError(
                f"Only {available_spots} spots available."
            )
        
        # Validate preferred date
        if data['preferred_date'] < timezone.now().date():
            raise serializers.ValidationError("Preferred date cannot be in the past.")
        
        # Check if date is in tour start dates
        if tour.start_dates and str(data['preferred_date']) not in tour.start_dates:
            raise serializers.ValidationError("Selected date is not available for this tour.")
        
        return data
    
    def create(self, validated_data):
        """Create a new booking"""
        request = self.context['request']
        tour = self.context['view'].get_tour()
        
        # Set user if authenticated
        if request.user.is_authenticated:
            validated_data['user'] = request.user
            validated_data['email'] = request.user.email
        
        validated_data['tour'] = tour
        return super().create(validated_data)

class BookingStatusSerializer(serializers.ModelSerializer):
    """Serializer for updating booking status"""
    class Meta:
        model = Booking
        fields = ['status']
    
    def validate_status(self, value):
        """Validate status transition"""
        if self.instance and self.instance.status == 'CANCELLED' and value != 'CANCELLED':
            raise serializers.ValidationError("Cannot change status of a cancelled booking.")
        return value