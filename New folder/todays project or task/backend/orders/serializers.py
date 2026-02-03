from rest_framework import serializers
from .models import Order
from measurements.models import Measurement
from measurements.serializers import MeasurementSerializer


class OrderSerializer(serializers.ModelSerializer):
    measurements = MeasurementSerializer()

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ("remaining",)

    def validate(self, data):
        """
        Business rule:
        receipt_paid must not be greater than price
        """
        price = data.get("price", getattr(self.instance, "price", None))
        receipt = data.get("receipt_paid", getattr(self.instance, "receipt_paid", None))

        if price is not None and receipt is not None:
            if receipt > price:
                raise serializers.ValidationError(
                    "Receipt paid cannot be greater than price"
                )

        return data

    def create(self, validated_data):
        measurements_data = validated_data.pop("measurements")

        order = Order.objects.create(**validated_data)
        Measurement.objects.create(order=order, **measurements_data)

        return order

    def update(self, instance, validated_data):
        measurements_data = validated_data.pop("measurements", None)

        # Update order fields safely (supports PATCH)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update measurements safely (NO coupling)
        if measurements_data:
            measurement = instance.measurements
            for attr, value in measurements_data.items():
                setattr(measurement, attr, value)
            measurement.save()

        return instance


# ------------------------------
# Print-safe serializer
# ------------------------------

class OrderPrintSerializer(serializers.ModelSerializer):
    """
    Serializer for printing:
    Only returns header fields needed for print view.
    """

    class Meta:
        model = Order
        fields = [
            "customer_name",
            "visit_date",
            "delivery_date",
            "price",
            "receipt_paid",
            "remaining",
        ]
