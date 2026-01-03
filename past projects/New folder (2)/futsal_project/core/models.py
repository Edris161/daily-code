from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import uuid

# Roles
ROLE_CHOICES = (
    ('admin', 'Admin'),
    ('coach', 'Coach'),
    ('accountant', 'Accountant'),
)

class User(AbstractUser):
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='coach')
    phone = models.CharField(max_length=30, blank=True, null=True)

class Team(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    coach = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): return self.name

class Player(models.Model):
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    dob = models.DateField(null=True, blank=True)
    position = models.CharField(max_length=50, blank=True)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='players')
    training_level = models.CharField(max_length=50, blank=True)
    fitness_score = models.FloatField(default=0)
    guardian_name = models.CharField(max_length=120, blank=True)
    guardian_phone = models.CharField(max_length=50, blank=True)
    guardian_email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): return f"{self.first_name} {self.last_name}"

class TrainingSession(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_sessions')

class Attendance(models.Model):
    session = models.ForeignKey(TrainingSession, on_delete=models.CASCADE, related_name='attendances')
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='attendances')
    present = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

class Performance(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='performances')
    date = models.DateField(default=timezone.now)
    speed = models.FloatField(null=True, blank=True)
    stamina = models.FloatField(null=True, blank=True)
    technique = models.FloatField(null=True, blank=True)
    discipline = models.FloatField(null=True, blank=True)
    notes = models.TextField(blank=True)

class FeePlan(models.Model):
    name = models.CharField(max_length=120)  # e.g., Monthly Junior
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    period = models.CharField(max_length=20, choices=(('monthly','Monthly'),('quarterly','Quarterly'),('yearly','Yearly')))
    age_min = models.IntegerField(null=True, blank=True)
    age_max = models.IntegerField(null=True, blank=True)
    training_level = models.CharField(max_length=50, blank=True)

    def __str__(self): return f"{self.name} - {self.amount}"

class PlayerFee(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='fees')
    fee_plan = models.ForeignKey(FeePlan, on_delete=models.SET_NULL, null=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=(('paid','Paid'),('partial','Partial'),('unpaid','Unpaid'),('overdue','Overdue')), default='unpaid')

    def remaining(self):
        return float(self.total_amount) - float(self.paid_amount)

class Payment(models.Model):
    PAYMENT_METHODS = (('cash','Cash'),('bank','Bank Transfer'),('online','Online'))
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='payments')
    player_fee = models.ForeignKey(PlayerFee, on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    reference = models.CharField(max_length=255, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    received_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='received_payments')

class Invoice(models.Model):
    number = models.CharField(max_length=64, unique=True)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='invoices')
    player_fee = models.ForeignKey(PlayerFee, on_delete=models.SET_NULL, null=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    pdf_file = models.FileField(upload_to='invoices/', null=True, blank=True)
