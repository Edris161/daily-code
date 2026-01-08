import uuid
from django.db import models


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Header (Notebook style)
    customer_name = models.CharField(max_length=255)
    visit_date = models.DateField()
    delivery_date = models.DateField()

    price = models.DecimalField(max_digits=10, decimal_places=2)
    receipt_paid = models.DecimalField(max_digits=10, decimal_places=2)

    # Auto-calculated (backend enforced)
    remaining = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False
    )

    # Notes section
    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # IMPORTANT: backend calculation, frontend cannot override
        self.remaining = max(self.price - self.receipt_paid, 0)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.customer_name
