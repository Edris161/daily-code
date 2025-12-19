from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/auth/', include('accounts.urls')),
    path('api/players/', include('players.urls')),
    path('api/teams/', include('teams.urls')),
    path('api/trainings/', include('trainings.urls')),
]
