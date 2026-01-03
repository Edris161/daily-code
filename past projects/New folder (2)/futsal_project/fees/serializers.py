from rest_framework import serializers
from .models import FeePlan, PlayerFee, Payment
from players.serializers import PlayerSerializer  # optional nested

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
