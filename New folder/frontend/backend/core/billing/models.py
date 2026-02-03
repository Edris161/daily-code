from django.db import models
from accounts.models import User

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class SaaSApp(models.Model):
    name = models.CharField(max_length=150)
    category = models.CharField(max_length=100)
    provider = models.CharField(max_length=100)
    license_count = models.PositiveIntegerField()
    monthly_cost = models.DecimalField(max_digits=10, decimal_places=2)
    annual_cost = models.DecimalField(max_digits=12, decimal_places=2)
    renewal_date = models.DateField()
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    assigned_users = models.ManyToManyField(User, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
