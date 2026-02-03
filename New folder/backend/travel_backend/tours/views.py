from rest_framework.generics import ListAPIView, RetrieveAPIView
from django_filters.rest_framework import DjangoFilterBackend

from .models import Tour
from .serializers import TourListSerializer, TourDetailSerializer
from .filters import TourFilter


class TourListAPIView(ListAPIView):
    queryset = Tour.objects.filter(is_active=True)
    serializer_class = TourListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TourFilter


class TourDetailAPIView(RetrieveAPIView):
    queryset = Tour.objects.filter(is_active=True)
    serializer_class = TourDetailSerializer
    lookup_field = 'slug'
class ToursByDestinationAPIView(ListAPIView):
    serializer_class = TourListSerializer

    def get_queryset(self):
        destination_slug = self.kwargs['slug']
        return Tour.objects.filter(
            destination__slug=destination_slug,
            is_active=True
        )