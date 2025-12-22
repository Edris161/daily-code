from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import Schedule
from .serializers import ScheduleSerializer


class ScheduleViewSet(ModelViewSet):
    queryset = Schedule.objects.select_related("team").all()
    serializer_class = ScheduleSerializer
