from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.generics import GenericAPIView
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

# ✅ Use relative imports within the accounts app
from .serializers import (
    LoginSerializer,
    UserSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer
)
from .models import User


# ----------------------
# Login API
# ----------------------
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


# ----------------------
# Logout API
# ----------------------
class LogoutView(APIView):
    def post(self, request):
        try:
            refresh = RefreshToken(request.data["refresh"])
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


# ----------------------
# Token Refresh API
# ----------------------
class CustomTokenRefreshView(TokenRefreshView):
    """
    Endpoint: POST /api/auth/refresh/
    Input: { "refresh": "<refresh_token>" }
    Output: { "access": "<new_access_token>" }
    """
    pass  # Using DRF SimpleJWT default serializer


# ----------------------
# Forgot Password API
# ----------------------
class ForgotPasswordView(GenericAPIView):
    serializer_class = ForgotPasswordSerializer
    permission_classes = []

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.get(email=serializer.validated_data["email"])
        token = PasswordResetTokenGenerator().make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = f"http://frontend-url/reset-password/{uid}/{token}"  # Replace with your frontend URL

        # In production: send this link via email
        return Response({
            "success": True,
            "message": f"Password reset link (send via email in production): {reset_link}"
        })


# ----------------------
# Reset Password API
# ----------------------
class ResetPasswordView(GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = []

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        user.set_password(serializer.validated_data["new_password"])
        user.save()

        return Response({
            "success": True,
            "message": "Password has been reset successfully"
        })
