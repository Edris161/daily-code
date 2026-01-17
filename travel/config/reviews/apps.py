from django.apps import AppConfig
from django.apps import AppConfig

class ReviewsConfig(AppConfig):
    name = 'reviews'


class ReviewsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'reviews'
    
    def ready(self):
        import reviews.signals  # Import signals