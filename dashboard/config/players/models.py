from django.db import models
from teams.models import Team


class Player(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    team = models.ForeignKey(
        Team,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="players"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
