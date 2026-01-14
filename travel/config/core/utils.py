import os
from django.utils.text import slugify
from datetime import datetime
import random
import string

def generate_unique_slug(instance, title, slug_field='slug'):
    """Generate unique slug for a model instance"""
    slug = slugify(title)
    model_class = instance.__class__
    
    # Check if slug already exists
    while model_class.objects.filter(**{slug_field: slug}).exists():
        random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
        slug = f"{slug}-{random_str}"
    
    return slug

def get_upload_path(instance, filename):
    """Generate upload path for media files"""
    date_path = datetime.now().strftime('%Y/%m/%d')
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    return os.path.join(instance._meta.model_name, date_path, filename)

def validate_image_extension(value):
    """Validate image file extension"""
    import os
    from django.core.exceptions import ValidationError
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')

class ResponseWrapper:
    """Standardized API response wrapper"""
    
    @staticmethod
    def success(data=None, message="Success", status_code=200):
        response = {
            "success": True,
            "message": message,
            "data": data
        }
        return response
    
    @staticmethod
    def error(message="Error", errors=None, status_code=400):
        response = {
            "success": False,
            "message": message,
            "errors": errors
        }
        return response