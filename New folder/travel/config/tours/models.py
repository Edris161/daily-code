from django.db import models
from django.utils.text import slugify
from core.models import TimeStampedModel
from destinations.models import Destination
import uuid

class Tour(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='tours')
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    duration_days = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    max_people = models.PositiveIntegerField(default=20)
    start_dates = models.JSONField(default=list)  # List of available dates
    included_services = models.JSONField(default=list)
    excluded_services = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_active']),
            models.Index(fields=['price']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.duration_days} days"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Tour.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)
    
    @property
    def available_seats(self):
        from bookings.models import Booking
        booked = Booking.objects.filter(
            tour=self,
            status__in=['PENDING', 'CONFIRMED']
        ).aggregate(total=models.Sum('number_of_people'))['total'] or 0
        return self.max_people - booked
    class Meta:
     ordering = ['-created_at']
    indexes = [
        models.Index(fields=['slug']),
        models.Index(fields=['is_active']),
        models.Index(fields=['price']),
        models.Index(fields=['duration_days']),  # Add this
        models.Index(fields=['created_at']),     # Add this
    ]