from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Accounts (registration/login)
    path('api/accounts/', include('accounts.urls')),

    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Organizations
    path('api/organizations/', include('organizations.urls')),

    # Projects
    path('api/projects/', include('projects.urls')),

    # Tasks
    path('api/tasks/', include('tasks.urls')),

    # DRF Spectacular (Schema + Swagger)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
