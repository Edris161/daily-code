
from rest_framework import viewsets
from .models import contact
from .serializers import contactSerializer

# -----------------------
# Blog ViewSet
# -----------------------
class contactViewSet(viewsets.ModelViewSet):
    queryset = contact.objects.all()
    serializer_class = contactSerializer



