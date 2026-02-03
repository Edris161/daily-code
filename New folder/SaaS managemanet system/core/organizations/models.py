from django.db import models
from django.contrib.auth.models import User


class Organization(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='owned_organizations',null=True, blank=True
        
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
