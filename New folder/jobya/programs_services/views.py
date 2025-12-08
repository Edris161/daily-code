
from rest_framework import viewsets
from .models import  Program, Card
from .serializers import ProgramSerializer, CardSerializer


class ProgramViewSet(viewsets.ModelViewSet):
    queryset =  Program.objects.all()
    serializer_class =  ProgramSerializer



class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
