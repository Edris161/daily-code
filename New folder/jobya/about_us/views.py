from rest_framework import viewsets
from .models import  about_us, history, team, stuff
from .serializers import about_usSerializer, historySerializer, teamySerializer, stuffSerializer



class about_usViewSet(viewsets.ModelViewSet):
    queryset = about_us.objects.all()
    serializer_class = about_usSerializer


class historyViewSet(viewsets.ModelViewSet):
    queryset = history.objects.all()
    serializer_class = historySerializer


class teamViewSet(viewsets.ModelViewSet):
    queryset = team.objects.all()
    serializer_class = teamySerializer


class stuffViewSet(viewsets.ModelViewSet):
    queryset = stuff.objects.all()
    serializer_class = stuffSerializer