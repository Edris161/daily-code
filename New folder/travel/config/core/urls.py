# core/urls.py
from django.urls import path
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import datetime

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Health check endpoint."""
    return JsonResponse({
        'status': 'healthy',
        'service': 'travel-agency-backend',
        'timestamp': datetime.datetime.now().isoformat(),
        'version': '1.0.0'
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def api_info(request):
    """API information endpoint."""
    return JsonResponse({
        'name': 'Travel Agency API',
        'version': '1.0.0',
        'description': 'Backend API for Travel Agency Web Application',
        'endpoints': {
            'auth': '/api/auth/',
            'destinations': '/api/destinations/',
            'tours': '/api/tours/',
            'bookings': '/api/bookings/',
            'reviews': '/api/reviews/',
            'media': '/api/media/',
        }
    })

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('info/', api_info, name='api-info'),
]