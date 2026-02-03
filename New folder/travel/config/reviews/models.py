from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import TimeStampedModel
from accounts.models import User
from tours.models import Tour
import uuid

class Review(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField()
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'tour']
        indexes = [
            models.Index(fields=['tour', 'rating']),
        ]
    
    def __str__(self):
        return f"Review by {self.user.email} for {self.tour.title}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Update tour rating average
        self.tour.save()

class TourRating(models.Model):
    tour = models.OneToOneField(Tour, on_delete=models.CASCADE, related_name='rating_stats')
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    total_reviews = models.PositiveIntegerField(default=0)
    rating_1 = models.PositiveIntegerField(default=0)
    rating_2 = models.PositiveIntegerField(default=0)
    rating_3 = models.PositiveIntegerField(default=0)
    rating_4 = models.PositiveIntegerField(default=0)
    rating_5 = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Rating stats for {self.tour.title}"
    
    def update_stats(self):
        from django.db.models import Avg, Count, Q
        reviews = Review.objects.filter(tour=self.tour)
        
        stats = reviews.aggregate(
            avg_rating=Avg('rating'),
            total=Count('id'),
            rating_1=Count('id', filter=Q(rating=1)),
            rating_2=Count('id', filter=Q(rating=2)),
            rating_3=Count('id', filter=Q(rating=3)),
            rating_4=Count('id', filter=Q(rating=4)),
            rating_5=Count('id', filter=Q(rating=5)),
        )
        
        self.average_rating = stats['avg_rating'] or 0
        self.total_reviews = stats['total'] or 0
        self.rating_1 = stats['rating_1'] or 0
        self.rating_2 = stats['rating_2'] or 0
        self.rating_3 = stats['rating_3'] or 0
        self.rating_4 = stats['rating_4'] or 0
        self.rating_5 = stats['rating_5'] or 0
        self.save()