from django.db import models

class Training(models.Model):
    STATUS_CHOICES = [
        ('Upcoming', 'Upcoming'),
        ('Completed', 'Completed'),
    ]

    title = models.CharField(max_length=100)
    date = models.DateField()
    time = models.CharField(max_length=50)
    coach = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.title
