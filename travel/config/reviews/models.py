from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Avg
from core.models import TimeStampedModel
from tours.models import Tour
from accounts.models import User

class Review(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'tour']
        indexes = [
            models.Index(fields=['tour', 'rating']),
            models.Index(fields=['user', 'tour']),
        ]
    
    def __str__(self):
        return f"Review by {self.user.email} for {self.tour.title}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Update tour's average rating
        self.update_tour_rating()
    
    def delete(self, *args, **kwargs):
        tour = self.tour
        super().delete(*args, **kwargs)
        # Update tour's average rating after deletion
        self.update_tour_rating(tour)
    
    def update_tour_rating(self, tour=None):
        if not tour:
            tour = self.tour
        
        avg_rating = tour.reviews.aggregate(
            average=Avg('rating')
        )['average'] or 0
        
        # Store average rating in tour (we'll add a field or use cache)
        # For now, we'll just calculate on the fly
        
    @classmethod
    def get_average_rating(cls, tour):
        return tour.reviews.aggregate(
            average=Avg('rating')
        )['average'] or 0
    
    @classmethod
    def get_total_reviews(cls, tour):
        return tour.reviews.count()