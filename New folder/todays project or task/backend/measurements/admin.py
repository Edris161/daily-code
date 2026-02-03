from django.contrib import admin
from .models import Measurement


@admin.register(Measurement)
class MeasurementAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "qad",
        "shana",
        "zirbaghal",
        "astin_value",
        "astin_type",
        "yakhan_value",
        "yakhan_type",
    )
