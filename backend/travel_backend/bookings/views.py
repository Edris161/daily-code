from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status

from .models import Booking
from .serializers import BookingCreateSerializer


class BookingCreateAPIView(CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()

        return Response(
            {
                "message": "Booking request submitted successfully.",
                "booking_id": booking.id,
                "status": booking.status,
            },
            status=status.HTTP_201_CREATED
        )
