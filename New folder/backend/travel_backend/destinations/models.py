from django.db import models
from django.utils.text import slugify


class Destination(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)

    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    short_description = models.CharField(max_length=300)
    full_description = models.TextField()

    cover_image = models.ImageField(
        upload_to='destinations/covers/'
    )

    latitude = models.DecimalField(
        max_digits=9, decimal_places=6,
        null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6,
        null=True, blank=True
    )

    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.city}, {self.country}"
