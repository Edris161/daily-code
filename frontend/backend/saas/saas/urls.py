from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # 🔐 JWT
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("api/users/", include("users.urls")),
    path("api/system/", include("system.urls")),
    path("api/subscriptions/", include("subscriptions.urls")),
    path("api/billing/", include("billing.urls")),
    path("api/notifications/", include("notifications.urls")),
]
