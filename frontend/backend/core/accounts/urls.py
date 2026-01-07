from django.urls import path
from .views import (
    LoginView,
    LogoutView,
    CustomTokenRefreshView,
    ForgotPasswordView,
    ResetPasswordView
)

urlpatterns = [
    # ----------------------
    # Login / Logout
    # ----------------------
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),

    # ----------------------
    # JWT Token Refresh
    # ----------------------
    path("refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),

    # ----------------------
    # Password Reset
    # ----------------------
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot_password"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset_password"),
]
