from django.db import models

class Destination(models.Model):
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    description = models.TextField()
    image = models.URLField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)
    rating = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Tour(models.Model):
    destination = models.ForeignKey(
        Destination,
        related_name='tours',
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    max_people = models.PositiveIntegerField()
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.title
 