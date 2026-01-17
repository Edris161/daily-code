from datetime import date
from django.db import models
from core.models import TimeStampedModel
from accounts.models import User
from tours.models import Tour
import uuid
from django.core.exceptions import ValidationError
class Booking(TimeStampedModel):
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
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='bookings')
    
    # Guest booking info (if user is not logged in)
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    number_of_people = models.PositiveIntegerField(default=1)
    preferred_date = models.DateField()
    special_requests = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['email']),
        ]
    
    def __str__(self):
        return f"Booking {self.id} - {self.tour.title}"
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.number_of_people > self.tour.available_seats:
            raise ValidationError(
                f"Only {self.tour.available_seats} seats available"
            )
    
    @property
    def total_price(self):
        return self.tour.price * self.number_of_people
    
    
# In Booking model, update the clean method:
def clean(self):
    if self.preferred_date < date.today():
        raise ValidationError("Preferred date cannot be in the past")
    
    available_seats = self.tour.available_seats
    if self.number_of_people > available_seats:
        raise ValidationError(
            f"Only {available_seats} seats available. "
            f"You requested {self.number_of_people}."
        )
    
    # Check if date is in tour's start dates
    if self.preferred_date.strftime('%Y-%m-%d') not in self.tour.start_dates:
        raise ValidationError(
            f"Selected date is not available. "
            f"Available dates: {', '.join(self.tour.start_dates)}"
        )
    def clean(self):
     if self.preferred_date < date.today():
        raise ValidationError("Preferred date cannot be in the past")
    
    available_seats = self.tour.available_seats
    if self.number_of_people > available_seats:
        raise ValidationError(
            f"Only {available_seats} seats available. "
            f"You requested {self.number_of_people}."
        )
    
    # Check if date is in tour's start dates
    if self.preferred_date.strftime('%Y-%m-%d') not in self.tour.start_dates:
        raise ValidationError(
            f"Selected date is not available. "
            f"Available dates: {', '.join(self.tour.start_dates[:5])}"  # Show first 5 dates
        )