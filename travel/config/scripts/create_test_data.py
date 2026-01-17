# scripts/create_test_data.py
import os
import django
import random
from datetime import datetime, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User
from destinations.models import Destination, DestinationImage
from tours.models import Tour
from bookings.models import Booking
from reviews.models import Review

def create_test_data():
    print("Creating test data...")
    
    # 1. Create users
    users = []
    for i in range(5):
        user = User.objects.create_user(
            email=f'user{i}@example.com',
            password='Test@123',
            full_name=f'Test User {i}',
            phone_number=f'+1234567890{i}'
        )
        users.append(user)
        print(f"Created user: {user.email}")
    
    # 2. Create admin user
    admin_user = User.objects.create_superuser(
        email='admin@travel.com',
        password='Admin@123',
        full_name='Admin User'
    )
    print(f"Created admin: {admin_user.email}")
    
    # 3. Create destinations
    destinations_data = [
        {
            'name': 'Paris',
            'country': 'France',
            'city': 'Paris',
            'short_description': 'City of love and lights',
            'full_description': 'Paris is famous for its art, fashion, and culture...',
            'is_featured': True,
            'latitude': 48.8566,
            'longitude': 2.3522
        },
        {
            'name': 'Bali',
            'country': 'Indonesia', 
            'city': 'Denpasar',
            'short_description': 'Tropical paradise island',
            'full_description': 'Bali is known for its forested volcanic mountains...',
            'is_featured': True,
            'latitude': -8.4095,
            'longitude': 115.1889
        },
        {
            'name': 'Tokyo',
            'country': 'Japan',
            'city': 'Tokyo',
            'short_description': 'Bustling metropolis with ancient traditions',
            'full_description': 'Tokyo mixes ultramodern with traditional...',
            'is_featured': False,
            'latitude': 35.6762,
            'longitude': 139.6503
        }
    ]
    
    destinations = []
    for data in destinations_data:
        destination = Destination.objects.create(**data)
        destinations.append(destination)
        print(f"Created destination: {destination.name}")
    
    # 4. Create tours
    tours_data = [
        {
            'destination': destinations[0],  # Paris
            'title': '7 Days Paris Adventure',
            'description': 'Experience the best of Paris...',
            'duration_days': 7,
            'price': 1200.00,
            'max_people': 15,
            'start_dates': [
                (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d'),
                (datetime.now() + timedelta(days=60)).strftime('%Y-%m-%d'),
                (datetime.now() + timedelta(days=90)).strftime('%Y-%m-%d')
            ],
            'included_services': ['Accommodation', 'Breakfast', 'Airport transfers', 'Tour guide'],
            'excluded_services': ['Flights', 'Lunch & Dinner', 'Personal expenses'],
            'is_active': True
        },
        {
            'destination': destinations[1],  # Bali
            'title': '10 Days Bali Relaxation',
            'description': 'Unwind in beautiful Bali...',
            'duration_days': 10,
            'price': 1500.00,
            'max_people': 10,
            'start_dates': [
                (datetime.now() + timedelta(days=45)).strftime('%Y-%m-%d'),
                (datetime.now() + timedelta(days=75)).strftime('%Y-%m-%d')
            ],
            'included_services': ['Luxury villa', 'All meals', 'Spa treatments', 'Yoga classes'],
            'excluded_services': ['Flights', 'Alcohol', 'Optional activities'],
            'is_active': True
        }
    ]
    
    tours = []
    for data in tours_data:
        tour = Tour.objects.create(**data)
        tours.append(tour)
        print(f"Created tour: {tour.title}")
    
    # 5. Create bookings
    for i, user in enumerate(users[:3]):
        for j, tour in enumerate(tours[:2]):
            booking = Booking.objects.create(
                user=user,
                tour=tour,
                full_name=user.full_name,
                email=user.email,
                phone=user.phone_number,
                number_of_people=random.randint(1, 3),
                preferred_date=datetime.now() + timedelta(days=30 + (i * 15) + (j * 7)),
                special_requests=f'Special request {i}{j}',
                status='CONFIRMED'
            )
            print(f"Created booking: {booking.id}")
    
    # 6. Create reviews
    for i, user in enumerate(users[:2]):
        for tour in tours:
            review = Review.objects.create(
                user=user,
                tour=tour,
                rating=random.randint(4, 5),
                comment=f'Excellent tour! Had a great time. {i}'
            )
            print(f"Created review by {user.email} for {tour.title}")
    
    print("\n✅ Test data created successfully!")
    print(f"Total: {User.objects.count()} users")
    print(f"Total: {Destination.objects.count()} destinations")
    print(f"Total: {Tour.objects.count()} tours")
    print(f"Total: {Booking.objects.count()} bookings")
    print(f"Total: {Review.objects.count()} reviews")

if __name__ == '__main__':
    create_test_data()