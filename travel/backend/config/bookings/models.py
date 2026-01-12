from django.db import models
from django.conf import settings
from travel.models import Tour

User = settings.AUTH_USER_MODEL

class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='bookings')
    people = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.tour}"
