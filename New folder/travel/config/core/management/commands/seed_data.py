from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from destinations.models import Destination, DestinationGallery
from tours.models import Tour, TourGallery
from media.models import Media
import random
from datetime import datetime, timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed the database with sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')
        
        # Create admin user
        admin, created = User.objects.get_or_create(
            email='admin@travelagency.com',
            defaults={
                'full_name': 'Admin User',
                'role': User.ADMIN,
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin.set_password('admin123')
            admin.save()
            self.stdout.write('Admin user created')
        
        # Create sample users
        sample_users = [
            {'email': 'john@example.com', 'full_name': 'John Doe', 'role': User.CUSTOMER},
            {'email': 'jane@example.com', 'full_name': 'Jane Smith', 'role': User.CUSTOMER},
            {'email': 'staff@travelagency.com', 'full_name': 'Staff Member', 'role': User.STAFF},
        ]
        
        for user_data in sample_users:
            user, created = User.objects.get_or_create(
                email=user_data['email'],
                defaults={
                    'full_name': user_data['full_name'],
                    'role': user_data['role']
                }
            )
            if created:
                user.set_password('password123')
                user.save()
                self.stdout.write(f"User {user.email} created")
        
        # Create destinations
        destinations_data = [
            {
                'name': 'Bali Paradise',
                'country': 'Indonesia',
                'city': 'Denpasar',
                'short_description': 'Tropical paradise with beautiful beaches',
                'full_description': 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
                'is_featured': True,
                'latitude': -8.409518,
                'longitude': 115.188919,
            },
            {
                'name': 'Swiss Alps',
                'country': 'Switzerland',
                'city': 'Interlaken',
                'short_description': 'Majestic mountains and alpine lakes',
                'full_description': 'Experience the breathtaking beauty of the Swiss Alps with snow-capped peaks and crystal-clear lakes.',
                'is_featured': True,
                'latitude': 46.686348,
                'longitude': 7.863205,
            },
            {
                'name': 'Tokyo Metropolis',
                'country': 'Japan',
                'city': 'Tokyo',
                'short_description': 'Vibrant city blending tradition and modernity',
                'full_description': 'Tokyo offers a unique blend of ultramodern and traditional attractions, from neon-lit skyscrapers to historic temples.',
                'is_featured': False,
                'latitude': 35.6762,
                'longitude': 139.6503,
            },
        ]
        
        for dest_data in destinations_data:
            destination, created = Destination.objects.get_or_create(
                name=dest_data['name'],
                defaults=dest_data
            )
            if created:
                self.stdout.write(f"Destination {destination.name} created")
        
        # Create tours
        tours_data = [
            {
                'destination': Destination.objects.get(name='Bali Paradise'),
                'title': 'Bali Beach Retreat',
                'description': '7-day luxury beach vacation in Bali',
                'duration_days': 7,
                'price': 1299.99,
                'currency': 'USD',
                'max_people': 15,
                'start_dates': [
                    str(datetime.now().date() + timedelta(days=30)),
                    str(datetime.now().date() + timedelta(days=45)),
                    str(datetime.now().date() + timedelta(days=60)),
                ],
                'included_services': 'Accommodation, Breakfast, Airport transfers, Guided tours',
                'excluded_services': 'Flight tickets, Personal expenses, Travel insurance',
                'is_active': True,
            },
            {
                'destination': Destination.objects.get(name='Swiss Alps'),
                'title': 'Alpine Adventure',
                'description': '10-day hiking and adventure tour in Swiss Alps',
                'duration_days': 10,
                'price': 2499.99,
                'currency': 'USD',
                'max_people': 12,
                'start_dates': [
                    str(datetime.now().date() + timedelta(days=40)),
                    str(datetime.now().date() + timedelta(days=55)),
                ],
                'included_services': 'Mountain lodges, All meals, Equipment rental, Guide services',
                'excluded_services': 'International flights, Personal gear, Travel insurance',
                'is_active': True,
            },
        ]
        
        for tour_data in tours_data:
            tour, created = Tour.objects.get_or_create(
                title=tour_data['title'],
                defaults=tour_data
            )
            if created:
                self.stdout.write(f"Tour {tour.title} created")
        
        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully!'))