from rest_framework import viewsets, permissions, filters
from .models import Team, Player, FeePlan, PlayerFee, Payment
from .serializers import TeamSerializer, PlayerSerializer, FeePlanSerializer, PlayerFeeSerializer, PaymentSerializer
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Player, Team, Payment
from django.utils.timezone import now
from django.db import models



class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return getattr(request.user, 'role', '') == 'admin'

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.select_related('team').all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['first_name','last_name','guardian_name']
    filterset_fields = ['team','training_level','is_active']

class FeePlanViewSet(viewsets.ModelViewSet):
    queryset = FeePlan.objects.all()
    serializer_class = FeePlanSerializer
    permission_classes = [IsAuthenticated]

class PlayerFeeViewSet(viewsets.ModelViewSet):
    queryset = PlayerFee.objects.select_related('player','fee_plan').all()
    serializer_class = PlayerFeeSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status','player__team']

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.select_related('player','received_by').all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
class DashboardSummaryAPIView(APIView):
    def get(self, request):
        total_players = Player.objects.count()
        total_teams = Team.objects.count()

        month = now().month
        year = now().year

        monthly_income = Payment.objects.filter(
            date__month=month,
            date__year=year
        ).aggregate(total=models.Sum("amount"))["total"] or 0

        return Response({
            "total_players": total_players,
            "total_teams": total_teams,
            "monthly_income": monthly_income,
        })
