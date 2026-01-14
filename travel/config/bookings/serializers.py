from rest_framework import serializers
from .models import Booking
from tours.serializers import TourListSerializer
from datetime import date

class BookingSerializer(serializers.ModelSerializer):
    tour = TourListSerializer(read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'tour', 'full_name', 'email', 'phone',
            'number_of_people', 'preferred_date', 'special_requests',
            'status', 'created_at'
        ]
        read_only_fields = ['user', 'status', 'created_at']

class BookingCreateSerializer(serializers.ModelSerializer):
    tour_slug = serializers.SlugRelatedField(
        source='tour',
        queryset=Booking.objects.all(),
        slug_field='slug',
        write_only=True
    )
    
    class Meta:
        model = Booking
        fields = [
            'tour_slug', 'full_name', 'email', 'phone',
            'number_of_people', 'preferred_date', 'special_requests'
        ]
    
    def validate(self, data):
        # Check if user is authenticated
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            data['user'] = request.user
        
        # Validate preferred date
        if data['preferred_date'] < date.today():
            raise serializers.ValidationError({
                'preferred_date': 'Preferred date cannot be in the past'
            })
        
        # Validate number of people
        tour = data.get('tour')
        if tour and data['number_of_people'] > tour.max_people:
            raise serializers.ValidationError({
                'number_of_people': f'Maximum number of people for this tour is {tour.max_people}'
            })
        
        return data
    
    def create(self, validated_data):
        request = self.context.get('request')
        
        # If user is authenticated, use their email as default if not provided
        if request and request.user.is_authenticated:
            if not validated_data.get('email'):
                validated_data['email'] = request.user.email
            if not validated_data.get('full_name'):
                validated_data['full_name'] = request.user.full_name
        
        return super().create(validated_data)

class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['status']
    
    def validate_status(self, value):
        valid_transitions = {
            'PENDING': ['CONFIRMED', 'CANCELLED'],
            'CONFIRMED': ['COMPLETED', 'CANCELLED'],
            'CANCELLED': [],
            'COMPLETED': []
        }
        
        current_status = self.instance.status
        if value not in valid_transitions.get(current_status, []):
            raise serializers.ValidationError(
                f"Cannot transition from {current_status} to {value}"
            )
        
        return value