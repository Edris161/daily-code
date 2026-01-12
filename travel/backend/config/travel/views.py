from rest_framework import generics, permissions
from .models import Destination, Tour
from .serializers import DestinationSerializer, TourSerializer

class DestinationListView(generics.ListAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer


class DestinationDetailView(generics.RetrieveAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer


class TourListView(generics.ListAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
