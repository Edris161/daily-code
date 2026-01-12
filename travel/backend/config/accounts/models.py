from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    age = models.PositiveIntegerField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
   
    def __str__(self):
        return self.age
