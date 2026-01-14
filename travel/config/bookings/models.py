from django.db import models
from django.core.validators import MinValueValidator
from core.models import TimeStampedModel
from tours.models import Tour
from accounts.models import User

class Booking(TimeStampedModel):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        CONFIRMED = 'CONFIRMED', 'Confirmed'
        CANCELLED = 'CANCELLED', 'Cancelled'
        COMPLETED = 'COMPLETED', 'Completed'
    
    user = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='bookings'
    )
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='bookings')
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    number_of_people = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        default=1
    )
    preferred_date = models.DateField()
    special_requests = models.TextField(blank=True)
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.PENDING
    )
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['email']),
            models.Index(fields=['user', 'created_at']),
        ]
    
    def __str__(self):
        return f"Booking #{self.id} - {self.full_name}"
    
    def clean(self):
        from django.core.exceptions import ValidationError
        
        if self.number_of_people > self.tour.max_people:
            raise ValidationError(
                f"Number of people ({self.number_of_people}) exceeds tour maximum ({self.tour.max_people})"
            )
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)