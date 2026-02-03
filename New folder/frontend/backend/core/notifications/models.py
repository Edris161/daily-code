from django.db import models
from billing.models import SaaSApp
from django.utils import timezone

ALERT_TYPES = [
    ("renewal", "Renewal"),
    ("usage", "Low Usage"),
    ("cost", "Over Budget"),
]

class Notification(models.Model):
    saas_app = models.ForeignKey(SaaSApp, on_delete=models.CASCADE)
    alert_type = models.CharField(max_length=20, choices=ALERT_TYPES)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    notify_date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.saas_app.name} - {self.alert_type}"
