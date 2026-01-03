from django.db import models

class Player(models.Model):
    POSITION_CHOICES = [
        ('GK', 'Goalkeeper'),
        ('DF', 'Defender'),
        ('MF', 'Midfielder'),
        ('FW', 'Forward'),
    ]

    full_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    position = models.CharField(max_length=2, choices=POSITION_CHOICES)
    team = models.CharField(max_length=100, blank=True)
    training_level = models.CharField(max_length=50)
    fitness_score = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
