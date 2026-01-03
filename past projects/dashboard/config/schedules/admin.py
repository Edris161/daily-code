from django.contrib import admin
from .models import Schedule


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ("team", "day_of_week", "start_time", "end_time", "location")
    list_filter = ("day_of_week", "team")
