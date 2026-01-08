from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Order
from .serializers import OrderSerializer, OrderPrintSerializer


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.select_related("measurements").all()
    serializer_class = OrderSerializer

    # Enable search & ordering for frontend
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["customer_name"]  # Search by customer name
    ordering_fields = ["created_at", "delivery_date", "customer_name"]  # Sortable fields
    ordering = ["-created_at"]  # Default: newest orders first

    @action(detail=True, methods=["get"])
    def print(self, request, pk=None):
        """
        Return only header fields for printing.
        URL: /api/orders/{id}/print/
        """
        order = self.get_object()
        serializer = OrderPrintSerializer(order)
        return Response(serializer.data)
class OrderViewSet(ModelViewSet):
    ...
    permission_classes = [IsAuthenticated]  # only logged-in users can access