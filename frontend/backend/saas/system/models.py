from django.db import models

class SaaSApp(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    provider = models.CharField(max_length=100)

    licenses = models.PositiveIntegerField()
    active_users = models.PositiveIntegerField()

    cost = models.DecimalField(max_digits=10, decimal_places=2)
    renewal_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
