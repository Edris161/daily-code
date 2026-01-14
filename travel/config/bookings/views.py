from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Booking
from .serializers import (
    BookingSerializer,
    BookingCreateSerializer,
    BookingStatusSerializer
)
from .filters import BookingFilter

class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingCreateSerializer
    permission_classes = [permissions.AllowAny]  # Allow guest bookings
    
    def perform_create(self, serializer):
        serializer.save()

class MyBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = BookingFilter
    
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).select_related('tour')

class AdminBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = BookingFilter
    
    def get_queryset(self):
        return Booking.objects.all().select_related('tour', 'user')

class BookingStatusUpdateView(generics.UpdateAPIView):
    serializer_class = BookingStatusSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Booking.objects.all()
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response({
            'message': f'Booking status updated to {instance.status}',
            'booking': BookingSerializer(instance).data
        })