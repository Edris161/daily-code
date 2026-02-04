from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Booking
from .serializers import BookingSerializer, BookingStatusSerializer
from .permissions import IsOwnerOrAdmin, IsAdminOrStaff
from tours.models import Tour

class CreateBookingView(generics.CreateAPIView):
    """Create a new booking"""
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_tour(self):
        """Get tour from URL parameter"""
        tour_id = self.kwargs.get('tour_id')
        return get_object_or_404(Tour, id=tour_id, is_active=True)
    
    def get_serializer_context(self):
        """Add tour to serializer context"""
        context = super().get_serializer_context()
        context['view'] = self
        return context
    
    def perform_create(self, serializer):
        """Create booking with tour"""
        tour = self.get_tour()
        serializer.save(tour=tour)

class UserBookingsView(generics.ListAPIView):
    """Get user's bookings"""
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']
    
    def get_queryset(self):
        return Booking.objects.filter(
            user=self.request.user
        ).select_related('tour', 'tour__destination').order_by('-created_at')

class AdminBookingsView(generics.ListAPIView):
    """Get all bookings (admin only)"""
    serializer_class = BookingSerializer
    permission_classes = [IsAdminOrStaff]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'tour']
    
    def get_queryset(self):
        return Booking.objects.select_related(
            'tour', 'tour__destination', 'user'
        ).all().order_by('-created_at')

class UpdateBookingStatusView(generics.UpdateAPIView):
    """Update booking status (admin only)"""
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = [IsAdminOrStaff]
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Send notification if status changed to CONFIRMED
        if serializer.validated_data.get('status') == 'CONFIRMED':
            # TODO: Send confirmation email
            pass
        
        return Response(BookingSerializer(instance).data)

class CancelBookingView(APIView):
    """Cancel a booking"""
    permission_classes = [IsOwnerOrAdmin]
    
    def post(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        
        # Check permission
        self.check_object_permissions(request, booking)
        
        # Check if can be cancelled
        if not booking.can_be_cancelled:
            return Response(
                {"detail": "Booking cannot be cancelled at this time."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        booking.status = Booking.CANCELLED
        booking.save()
        
        return Response(
            {"detail": "Booking cancelled successfully."},
            status=status.HTTP_200_OK
        )