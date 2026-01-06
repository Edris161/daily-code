from django.db import models
from system.models import SaaSApp

class Billing(models.Model):
    DEPARTMENT_CHOICES = (
        ("HR", "HR"),
        ("Engineering", "Engineering"),
        ("Design", "Design"),
        ("Finance", "Finance"),
    )

    app = models.ForeignKey(
        SaaSApp,
        on_delete=models.CASCADE,
        related_name="billing_items",
    )

    department = models.CharField(
        max_length=50,
        choices=DEPARTMENT_CHOICES
    )

    monthly_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    yearly_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # auto-calculate yearly cost
        self.yearly_cost = self.monthly_cost * 12
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.app.name} - {self.department}"
