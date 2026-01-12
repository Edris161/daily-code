from django.db import models
from bookings.models import Booking

class Payment(models.Model):
    PAYMENT_STATUS = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    )

    booking = models.OneToOneField(
        Booking,
        on_delete=models.CASCADE,
        related_name='payment'
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=50, default='stripe')
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    transaction_id = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment #{self.id}"
