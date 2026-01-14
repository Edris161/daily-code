from django.db import models
from apps.core.models import TimeStampedModel
import os
import uuid
from django.core.exceptions import ValidationError

def media_upload_path(instance, filename):
    """Generate upload path for media files"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    date_path = models.DateTimeField(auto_now_add=True).strftime('%Y/%m/%d')
    return os.path.join('media', date_path, filename)

def validate_image_extension(value):
    """Validate image file extensions"""
    import os
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension. Supported: jpg, jpeg, png, gif, webp, svg')

class Media(TimeStampedModel):
    file = models.FileField(upload_to=media_upload_path, validators=[validate_image_extension])
    alt_text = models.CharField(max_length=255, blank=True)
    uploaded_by = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'Media'
        verbose_name_plural = 'Media'
    
    def __str__(self):
        return self.file.name
    
    @property
    def file_type(self):
        """Get file type (image, document, etc.)"""
        ext = os.path.splitext(self.file.name)[1].lower()
        image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
        
        if ext in image_extensions:
            return 'image'
        return 'document'
    
    @property
    def file_size(self):
        """Get file size in MB"""
        try:
            return self.file.size / (1024 * 1024)  # Convert to MB
        except:
            return 0
    
    def save(self, *args, **kwargs):
        # Set uploaded_by if not set and request is available
        if not self.uploaded_by and hasattr(self, '_request_user'):
            self.uploaded_by = self._request_user
        super().save(*args, **kwargs)