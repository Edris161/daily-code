from django.db import models

class Player(models.Model):
    POSITION_CHOICES = [
        ('Forward', 'Forward'),
        ('Midfielder', 'Midfielder'),
        ('Defender', 'Defender'),
        ('Goalkeeper', 'Goalkeeper'),
    ]

    name = models.CharField(max_length=100)
    position = models.CharField(max_length=20, choices=POSITION_CHOICES)
    age = models.IntegerField()
    photo = models.ImageField(upload_to='players/', blank=True, null=True)

    def __str__(self):
        return self.name
