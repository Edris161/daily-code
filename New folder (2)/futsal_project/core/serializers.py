from rest_framework import serializers
from .models import User, Team, Player, TrainingSession, Attendance, Performance, FeePlan, PlayerFee, Payment, Invoice
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id','username','first_name','last_name','email','role','phone']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(write_only=True, source='team', queryset=Team.objects.all(), required=False, allow_null=True)
    class Meta:
        model = Player
        fields = ['id','first_name','last_name','dob','position','team','team_id','training_level','fitness_score','guardian_name','guardian_phone','guardian_email','is_active','created_at']

# Create basic serializers for FeePlan, PlayerFee, Payment, Invoice
class FeePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeePlan
        fields = '__all__'

class PlayerFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerFee
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
