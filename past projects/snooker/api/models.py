from django.db import models
from django.contrib.auth.models import User

class Table(models.Model):
    table_number = models.IntegerField(unique=True)
    price_per_hour = models.IntegerField()

    def __str__(self):
        return f"Table {self.table_number}"

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    duration_hours = models.IntegerField()
    status = models.CharField(max_length=20, default="pending")

    @property
    def total_price(self):
        return self.duration_hours * self.table.price_per_hour
