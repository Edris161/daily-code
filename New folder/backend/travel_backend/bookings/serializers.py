from rest_framework import serializers
from .models import Booking
from tours.models import Tour


class BookingCreateSerializer(serializers.ModelSerializer):
    tour = serializers.SlugRelatedField(
        queryset=Tour.objects.filter(is_active=True),
        slug_field='slug'
    )

    class Meta:
        model = Booking
        fields = [
            'tour',
            'full_name',
            'email',
            'phone',
            'number_of_people',
            'preferred_date',
            'special_requests',
        ]

    def validate_number_of_people(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Number of people must be greater than zero."
            )
        return value
