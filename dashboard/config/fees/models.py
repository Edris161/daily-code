from django.db import models
from players.models import Player


class Fee(models.Model):
    player = models.ForeignKey(
        Player,
        on_delete=models.CASCADE,
        related_name="fees"
    )

    month = models.DateField(help_text="Use first day of month")
    amount = models.PositiveIntegerField()
    paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("player", "month")
        ordering = ["-month"]

    def __str__(self):
        return f"{self.player.name} - {self.month}"
