from django.db import models
from system.models import SaaSApp

class Subscription(models.Model):
    PLAN_CHOICES = (
        ("Free", "Free"),
        ("Pro", "Pro"),
        ("Business", "Business"),
        ("Enterprise", "Enterprise"),
    )

    app = models.ForeignKey(
        SaaSApp,
        on_delete=models.CASCADE,
        related_name="subscriptions"
    )

    plan_type = models.CharField(
        max_length=50,
        choices=PLAN_CHOICES
    )

    licenses = models.PositiveIntegerField()
    assigned_users = models.PositiveIntegerField()

    renewal_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.app.name} - {self.plan_type}"
