from django.db import models
import os
import uuid

def upload_to(instance, filename):
    """Generate upload path for media files"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    
    if hasattr(instance, 'destination'):
        return os.path.join('destinations', filename)
    elif hasattr(instance, 'tour'):
        return os.path.join('tours', filename)
    else:
        return os.path.join('general', filename)

class Media(models.Model):
    """Media model for storing images"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.ImageField(upload_to=upload_to)
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    uploaded_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='uploaded_media'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'Media'
        verbose_name_plural = 'Media'
    
    def __str__(self):
        return f"{self.file.name} ({self.uploaded_at.date()})"
    
    @property
    def filename(self):
        """Get filename without path"""
        return os.path.basename(self.file.name)
    
    @property
    def file_size(self):
        """Get file size in KB"""
        try:
            return self.file.size / 1024  # Convert to KB
        except:
            return 0
    
    @property
    def file_type(self):
        """Get file type"""
        return self.file.name.split('.')[-1].lower()
    
    def delete(self, *args, **kwargs):
        """Delete file from storage when model is deleted"""
        storage, path = self.file.storage, self.file.path
        super().delete(*args, **kwargs)
        storage.delete(path)