from django.db import models
from django.utils.text import slugify
from core.models import TimeStampedModel
import uuid

class Destination(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    short_description = models.TextField(max_length=500)
    full_description = models.TextField()
    cover_image = models.ImageField(upload_to='destinations/covers/')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_featured']),
        ]
    
    def __str__(self):
        return f"{self.name}, {self.country}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(f"{self.name} {self.country}")
            slug = base_slug
            counter = 1
            while Destination.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

class DestinationImage(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='destinations/gallery/')
    alt_text = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['uploaded_at']
    
    def __str__(self):
        return f"Image for {self.destination.name}"