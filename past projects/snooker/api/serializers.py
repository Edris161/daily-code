from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Table, Booking

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# Table Serializer
class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'table_number', 'price_per_hour']

# Booking Serializer
class BookingSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Booking
        fields = ['id', 'user', 'table', 'date', 'start_time', 'duration_hours', 'status', 'total_price']
