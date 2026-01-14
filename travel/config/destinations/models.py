from django.db import models
from django.utils.text import slugify
from core.models import TimeStampedModel
from media.models import Media
import random
import string

class Destination(TimeStampedModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    short_description = models.TextField(max_length=500)
    full_description = models.TextField()
    cover_image = models.ForeignKey(Media, on_delete=models.SET_NULL, null=True, blank=True, related_name='destination_covers')
    gallery_images = models.ManyToManyField(Media, related_name='destination_galleries', blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_featured']),
            models.Index(fields=['country', 'city']),
        ]
    
    def __str__(self):
        return f"{self.name}, {self.country}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.generate_unique_slug()
        super().save(*args, **kwargs)
    
    def generate_unique_slug(self):
        base_slug = slugify(f"{self.name} {self.country}")
        slug = base_slug
        counter = 1
        
        while Destination.objects.filter(slug=slug).exists():
            random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
            slug = f"{base_slug}-{random_str}"
            counter += 1
        
        return slug