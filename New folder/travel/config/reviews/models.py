from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from accounts.models import User
from tours.models import Tour

class Review(models.Model):
    """Review model"""
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    tour = models.ForeignKey(
        Tour, 
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'tour']  # One review per user per tour
        indexes = [
            models.Index(fields=['tour', 'created_at']),
            models.Index(fields=['user', 'tour']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.tour.title} ({self.rating}/5)"
    
    def save(self, *args, **kwargs):
        """Save review and update tour rating"""
        super().save(*args, **kwargs)
        self.update_tour_rating()
    
    def delete(self, *args, **kwargs):
        """Delete review and update tour rating"""
        super().delete(*args, **kwargs)
        self.update_tour_rating()
    
    def update_tour_rating(self):
        """Update average rating for the tour"""
        from django.db.models import Avg
        average = self.tour.reviews.aggregate(
            avg_rating=Avg('rating')
        )['avg_rating'] or 0
        # You can store this in a cache or denormalize in Tour model if needed