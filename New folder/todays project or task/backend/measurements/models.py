import uuid
from django.db import models
from orders.models import Order


class Measurement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # One notebook page → one measurement set
    order = models.OneToOneField(
        Order,
        related_name="measurements",
        on_delete=models.CASCADE
    )

    # Core measurements
    qad = models.FloatField()
    shana = models.FloatField()
    zirbaghal = models.FloatField()

    # آستین (CRITICAL: value & type are independent)
    astin_value = models.FloatField()
    astin_type = models.CharField(max_length=50, blank=True, null=True)

    kamar = models.FloatField()

    # یخن (CRITICAL)
    yakhan_value = models.FloatField()
    yakhan_type = models.CharField(max_length=50, blank=True, null=True)

    shalwar_qad = models.FloatField()
    pacha = models.FloatField()

    def __str__(self):
        return f"Measurements for {self.order.customer_name}"
