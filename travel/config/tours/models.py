from django.db import models
from django.core.validators import MinValueValidator
from core.models import TimeStampedModel
from destinations.models import Destination
import json

class Tour(TimeStampedModel):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='tours')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    description = models.TextField()
    duration_days = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    max_people = models.PositiveIntegerField(default=10)
    start_dates = models.JSONField(default=list, help_text='List of available start dates in ISO format')
    included_services = models.JSONField(default=list, help_text='List of included services')
    excluded_services = models.JSONField(default=list, help_text='List of excluded services')
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_active']),
            models.Index(fields=['destination', 'is_active']),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            import random
            import string
            
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            
            while Tour.objects.filter(slug=slug).exists():
                random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
                slug = f"{base_slug}-{random_str}"
                counter += 1
            
            self.slug = slug
        
        # Ensure JSON fields are lists
        if isinstance(self.start_dates, str):
            self.start_dates = json.loads(self.start_dates)
        if isinstance(self.included_services, str):
            self.included_services = json.loads(self.included_services)
        if isinstance(self.excluded_services, str):
            self.excluded_services = json.loads(self.excluded_services)
        
        super().save(*args, **kwargs)