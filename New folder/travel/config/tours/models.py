from django.db import models
from django.utils.text import slugify
from destinations.models import Destination
from media.models import Media

class Tour(models.Model):
    """Tour package model"""
    destination = models.ForeignKey(
        Destination, 
        on_delete=models.CASCADE,
        related_name='tours'
    )
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    duration_days = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    max_people = models.PositiveIntegerField(default=10)
    start_dates = models.JSONField(default=list)  # Store as list of dates
    included_services = models.TextField(help_text="List of included services")
    excluded_services = models.TextField(help_text="List of excluded services")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['destination']),
            models.Index(fields=['is_active']),
            models.Index(fields=['price']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.destination.name}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.title}-{self.destination.name}")
        super().save(*args, **kwargs)
    
    @property
    def available_spots(self):
        """Calculate available spots"""
        total_bookings = self.bookings.filter(status='CONFIRMED').aggregate(
            total=models.Sum('number_of_people')
        )['total'] or 0
        return max(0, self.max_people - total_bookings)

class TourGallery(models.Model):
    """Tour gallery images"""
    tour = models.ForeignKey(
        Tour, 
        on_delete=models.CASCADE,
        related_name='gallery_images'
    )
    image = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        related_name='tour_gallery'
    )
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'created_at']
        verbose_name_plural = 'Tour Galleries'
    
    def __str__(self):
        return f"Image for {self.tour.title}"