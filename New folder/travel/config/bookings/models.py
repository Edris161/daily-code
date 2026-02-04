from django.db import models
from accounts.models import User
from tours.models import Tour

class Booking(models.Model):
    """Booking model"""
    PENDING = 'PENDING'
    CONFIRMED = 'CONFIRMED'
    CANCELLED = 'CANCELLED'
    COMPLETED = 'COMPLETED'
    
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (CONFIRMED, 'Confirmed'),
        (CANCELLED, 'Cancelled'),
        (COMPLETED, 'Completed'),
    ]
    
    user = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='bookings'
    )
    tour = models.ForeignKey(
        Tour, 
        on_delete=models.CASCADE,
        related_name='bookings'
    )
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    number_of_people = models.PositiveIntegerField(default=1)
    preferred_date = models.DateField()
    special_requests = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default=PENDING
    )
    total_amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        null=True, 
        blank=True
    )
    booking_reference = models.CharField(
        max_length=20, 
        unique=True, 
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['booking_reference']),
            models.Index(fields=['status']),
            models.Index(fields=['user', 'created_at']),
        ]
    
    def __str__(self):
        return f"Booking #{self.booking_reference} - {self.tour.title}"
    
    def save(self, *args, **kwargs):
        if not self.booking_reference:
            self.booking_reference = self.generate_reference()
        
        if not self.total_amount:
            self.total_amount = self.calculate_total()
        
        super().save(*args, **kwargs)
    
    def generate_reference(self):
        """Generate unique booking reference"""
        import random
        import string
        while True:
            ref = 'BK' + ''.join(random.choices(string.digits, k=8))
            if not Booking.objects.filter(booking_reference=ref).exists():
                return ref
    
    def calculate_total(self):
        """Calculate total amount"""
        return self.tour.price * self.number_of_people
    
    @property
    def can_be_cancelled(self):
        """Check if booking can be cancelled"""
        from datetime import datetime, timedelta
        days_before = (self.preferred_date - datetime.now().date()).days
        return self.status in [self.PENDING, self.CONFIRMED] and days_before >= 2