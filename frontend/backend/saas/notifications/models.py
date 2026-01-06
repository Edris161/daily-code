from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Notification(models.Model):
    NOTIFICATION_TYPE = (
        ("info", "Info"),
        ("warning", "Warning"),
        ("danger", "Danger"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    title = models.CharField(max_length=255)
    message = models.TextField()

    type = models.CharField(
        max_length=20,
        choices=NOTIFICATION_TYPE,
        default="info"
    )

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
