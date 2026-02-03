from django.db import models
from core.models import TimeStampedModel
import uuid

class Media(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(upload_to='uploads/')
    alt_text = models.CharField(max_length=255, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Media'
        verbose_name_plural = 'Media'
    
    def __str__(self):
        return self.file.name
    
    @property
    def file_type(self):
        if self.file.name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
            return 'image'
        elif self.file.name.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
            return 'video'
        elif self.file.name.lower().endswith(('.pdf', '.doc', '.docx')):
            return 'document'
        return 'other'
    
    @property
    def file_url(self):
        return self.file.url if self.file else None