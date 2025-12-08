from django.db import models

# Create your models here.
class contact (models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.TextField()
    discraptions = models.TextField() 