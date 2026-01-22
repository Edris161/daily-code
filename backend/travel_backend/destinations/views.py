from rest_framework.generics import ListAPIView, RetrieveAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import Destination
from .serializers import (
    DestinationListSerializer,
    DestinationDetailSerializer
)


class DestinationListAPIView(ListAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationListSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'country', 'city']


class FeaturedDestinationAPIView(ListAPIView):
    queryset = Destination.objects.filter(is_featured=True)
    serializer_class = DestinationListSerializer


class DestinationDetailAPIView(RetrieveAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationDetailSerializer
    lookup_field = 'slug'
