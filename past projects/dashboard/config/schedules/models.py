from django.db import models
from teams.models import Team


class Schedule(models.Model):
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="schedules"
    )

    day_of_week = models.IntegerField(
        choices=[
            (0, "Monday"),
            (1, "Tuesday"),
            (2, "Wednesday"),
            (3, "Thursday"),
            (4, "Friday"),
            (5, "Saturday"),
            (6, "Sunday"),
        ]
    )

    start_time = models.TimeField()
    end_time = models.TimeField()

    location = models.CharField(max_length=100, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["day_of_week", "start_time"]
        unique_together = ("team", "day_of_week", "start_time")

    def __str__(self):
        return f"{self.team.name} - {self.get_day_of_week_display()}"
