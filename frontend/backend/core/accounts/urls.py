from django.urls import path
from .views import (
    LoginView,
    LogoutView,
    CustomTokenRefreshView,
    ForgotPasswordView,
    ResetPasswordView,
    UserListCreateView,
    UserDetailView,
)

app_name = "accounts"

urlpatterns = [
    # =================================================
    # PROMPT 1 — AUTHENTICATION
    # =================================================
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot_password"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset_password"),

    # =================================================
    # PROMPT 5 — USER MANAGEMENT (ADMIN ONLY)
    # =================================================
    path("users/", UserListCreateView.as_view(), name="user_list_create"),
    path("users/<int:pk>/", UserDetailView.as_view(), name="user_detail"),
]
