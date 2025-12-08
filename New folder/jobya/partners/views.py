
from rest_framework import viewsets
from .models import  adu_partners, feature
from .serializers import adu_partnersSerializer, featureSerializer


class adu_partnersViewSet(viewsets.ModelViewSet):
    queryset =  adu_partners.objects.all()
    serializer_class =  adu_partnersSerializer


class featureViewSet(viewsets.ModelViewSet):
    queryset = feature.objects.all()
    serializer_class = featureSerializer