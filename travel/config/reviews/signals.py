from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Review, TourRating

@receiver(post_save, sender=Review)
def update_rating_on_save(sender, instance, created, **kwargs):
    """Update tour rating when a review is saved."""
    tour_rating, created = TourRating.objects.get_or_create(tour=instance.tour)
    tour_rating.update_stats()

@receiver(post_delete, sender=Review)
def update_rating_on_delete(sender, instance, **kwargs):
    """Update tour rating when a review is deleted."""
    try:
        tour_rating = TourRating.objects.get(tour=instance.tour)
        tour_rating.update_stats()
    except TourRating.DoesNotExist:
        pass