from django.db import models


class SaaSApp(models.Model):
    CATEGORY_CHOICES = (
        ("productivity", "Productivity"),
        ("communication", "Communication"),
        ("finance", "Finance"),
        ("development", "Development"),
        ("design", "Design"),
        ("security", "Security"),
        ("other", "Other"),
    )

    name = models.CharField(max_length=150)
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )
    provider = models.CharField(max_length=150)

    license_count = models.PositiveIntegerField(default=0)
    active_users = models.PositiveIntegerField(default=0)

    monthly_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    annual_cost = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    renewal_date = models.DateField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
