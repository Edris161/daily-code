from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
   path('api/', include('core.urls')),
    path('api/destinations/', include('destinations.urls')),
    path('api/tours/', include('tours.urls')),
    path('api/bookings/', include('bookings.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
