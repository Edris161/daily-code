import string
import random
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.conf import settings

def generate_random_string(length=10):
    """Generate random string"""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def send_email_notification(subject, message, recipient_list, html_message=None):
    """Send email notification"""
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipient_list,
            html_message=html_message,
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def format_currency(amount, currency='USD'):
    """Format currency amount"""
    currency_symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'INR': '₹',
    }
    
    symbol = currency_symbols.get(currency, currency)
    return f"{symbol}{amount:,.2f}"

def calculate_discount_price(original_price, discount_percentage):
    """Calculate discounted price"""
    discount_amount = original_price * (discount_percentage / 100)
    return original_price - discount_amount

def validate_date_range(start_date, end_date):
    """Validate date range"""
    if start_date > end_date:
        return False, "Start date must be before end date"
    
    if start_date < datetime.now().date():
        return False, "Start date cannot be in the past"
    
    # Maximum booking period (e.g., 1 year)
    max_period = timedelta(days=365)
    if (end_date - start_date) > max_period:
        return False, f"Booking period cannot exceed {max_period.days} days"
    
    return True, None