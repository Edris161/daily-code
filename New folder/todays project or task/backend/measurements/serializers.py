from rest_framework import serializers
from .models import Measurement


class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        exclude = ("order",)

    def validate(self, data):
        for field, value in data.items():
            if isinstance(value, (int, float)) and value < 0:
                raise serializers.ValidationError(
                    f"{field} must be a positive number"
                )
        return data
