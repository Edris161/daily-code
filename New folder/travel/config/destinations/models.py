from django.db import models
from django.utils.text import slugify
from media.models import Media

class Destination(models.Model):
    """Destination model"""
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    short_description = models.TextField(max_length=500)
    full_description = models.TextField()
    cover_image = models.ForeignKey(
        Media, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='destination_cover'
    )
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['country']),
            models.Index(fields=['is_featured']),
        ]
    
    def __str__(self):
        return f"{self.name}, {self.country}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.name}-{self.country}")
        super().save(*args, **kwargs)

class DestinationGallery(models.Model):
    """Destination gallery images"""
    destination = models.ForeignKey(
        Destination, 
        on_delete=models.CASCADE,
        related_name='gallery_images'
    )
    image = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        related_name='destination_gallery'
    )
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'created_at']
        verbose_name_plural = 'Destination Galleries'
    
    def __str__(self):
        return f"Image for {self.destination.name}"