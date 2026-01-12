from rest_framework import generics, permissions
from .models import Payment
from .serializers import PaymentSerializer
from bookings.models import Booking

class CreatePaymentView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        booking = Booking.objects.get(id=self.request.data['booking'])
        serializer.save(
            booking=booking,
            amount=booking.total_price,
            status='paid',
            transaction_id='MOCK_STRIPE_123'
        )
        booking.status = 'confirmed'
        booking.save()
