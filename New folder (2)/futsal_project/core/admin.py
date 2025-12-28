# core/admin.py
from django.contrib import admin
from .models import User, Team, Player, TrainingSession, Attendance, Performance, FeePlan, PlayerFee, Payment, Invoice
from django.contrib.auth.admin import UserAdmin
admin.site.register(User, UserAdmin)
admin.site.register([Team, Player, TrainingSession, Attendance, Performance, FeePlan, PlayerFee, Payment, Invoice])
