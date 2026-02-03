from django.urls import path, include

urlpatterns = [
    path('bookings/', include('bookings.urls')),
    path('tours/', include('tours.urls')),
     path('destinations/', include('destinations.urls')),
]