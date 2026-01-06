from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_ADMIN = "Admin"
    ROLE_MANAGER = "Manager"
    ROLE_EMPLOYEE = "Employee"

    ROLE_CHOICES = (
        (ROLE_ADMIN, "Admin"),
        (ROLE_MANAGER, "Manager"),
        (ROLE_EMPLOYEE, "Employee"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=ROLE_EMPLOYEE,
    )

    def __str__(self):
        return self.username
