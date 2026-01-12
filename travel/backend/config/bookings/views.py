from rest_framework import generics, permissions
from .models import Booking
from .serializers import BookingSerializer

class CreateBookingView(generics.CreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        tour = serializer.validated_data['tour']
        people = serializer.validated_data['people']
        total_price = tour.price * people

        serializer.save(
            user=self.request.user,
            total_price=total_price
        )


class MyBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)
