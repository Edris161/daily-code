from django.db import models
from tours.models import Tour


class Booking(models.Model):

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
    ]

    tour = models.ForeignKey(
        Tour,                      # ✅ این خط خیلی مهم است
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)

    number_of_people = models.PositiveIntegerField()
    preferred_date = models.DateField()

    special_requests = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.tour.title}"
