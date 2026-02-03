from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Booking
from .serializers import (
    BookingSerializer, AdminBookingSerializer, BookingStatusSerializer
)
from core.permissions import IsAdmin

class CreateBookingView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()
        
        headers = self.get_success_headers(serializer.data)
        return Response({
            'success': True,
            'message': 'Booking created successfully',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)

class UserBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']
    
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).select_related('tour')

class AdminBookingsView(generics.ListAPIView):
    serializer_class = AdminBookingSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'tour']
    
    def get_queryset(self):
        return Booking.objects.all().select_related('tour', 'user')

class UpdateBookingStatusView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = [IsAdmin]
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        
        old_status = instance.status
        new_status = serializer.validated_data['status']
        
        self.perform_update(serializer)
        
        return Response({
            'success': True,
            'message': f'Booking status updated from {old_status} to {new_status}',
            'data': BookingSerializer(instance).data
        })