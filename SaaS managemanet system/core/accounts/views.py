from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .serializers import RegisterSerializer

# این خط باعث می‌شود Spectacular این View را در Schema نیاورد
@extend_schema(exclude=True)
class RegisterView(APIView):
    permission_classes = []  # اجازه ثبت‌نام بدون لاگین

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
