from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from .models import User
from .serializers import (
    LoginSerializer,
    UserSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
    UserListSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
)


# =====================================================
# PROMPT 1 — AUTH VIEWS
# =====================================================

class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)

        return Response({
            "success": True,
            "data": {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data
            },
            "message": "Login successful"
        })


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh = RefreshToken(request.data.get("refresh"))
            refresh.blacklist()
            return Response({
                "success": True,
                "message": "Logged out successfully"
            })
        except Exception:
            return Response({
                "success": False,
                "message": "Invalid token"
            }, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenRefreshView(TokenRefreshView):
    pass


class ForgotPasswordView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.get(email=serializer.validated_data["email"])
        token = PasswordResetTokenGenerator().make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        return Response({
            "success": True,
            "message": f"Password reset link (send via email in production): "
                       f"http://frontend-url/reset-password/{uid}/{token}"
        })


class ResetPasswordView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()  # Actually reset password

        return Response({
            "success": True,
            "message": "Password has been reset successfully"
        })


# =====================================================
# 🔐 PROMPT 5 — ADMIN PERMISSION
# =====================================================

class IsAdminUserRole(permissions.BasePermission):
    """
    Allows access only to users with role = admin
    """
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.role == "admin"
        )


# =====================================================
# PROMPT 5 — USER MANAGEMENT VIEWS
# =====================================================

class UserListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminUserRole]

    def get(self, request):
        users = User.objects.all().order_by("-created_at")
        serializer = UserListSerializer(users, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        })

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "success": True,
            "message": "User created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)


class UserDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminUserRole]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None

    def put(self, request, pk):
        user = self.get_object(pk)
        if not user:
            return Response(
                {"success": False, "message": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserUpdateSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "success": True,
            "message": "User updated successfully",
            "data": serializer.data
        })

    def delete(self, request, pk):
        user = self.get_object(pk)
        if not user:
            return Response(
                {"success": False, "message": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        user.delete()
        return Response({
            "success": True,
            "message": "User deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)
