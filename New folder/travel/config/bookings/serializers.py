from rest_framework import serializers
from .models import Booking
from tours.serializers import TourListSerializer
from accounts.serializers import UserProfileSerializer
from datetime import date

class BookingSerializer(serializers.ModelSerializer):
    tour_details = TourListSerializer(source='tour', read_only=True)
    total_price = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    user_details = UserProfileSerializer(source='user', read_only=True)
    
    class Meta:
        model = Booking
        fields = ('id', 'user', 'user_details', 'tour', 'tour_details', 
                  'full_name', 'email', 'phone', 'number_of_people', 
                  'preferred_date', 'special_requests', 'status', 
                  'total_price', 'created_at')
        read_only_fields = ('id', 'status', 'created_at', 'user')
    
    def validate(self, data):
        # Validate preferred date is not in the past
        if data.get('preferred_date') < date.today():
            raise serializers.ValidationError(
                "Preferred date cannot be in the past"
            )
        
        # Check available seats
        tour = data.get('tour')
        number_of_people = data.get('number_of_people', 1)
        
        if tour and number_of_people > tour.available_seats:
            raise serializers.ValidationError(
                f"Only {tour.available_seats} seats available for this tour"
            )
        
        return data
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)

class AdminBookingSerializer(BookingSerializer):
    class Meta(BookingSerializer.Meta):
        read_only_fields = ('id', 'created_at')

class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('status',)