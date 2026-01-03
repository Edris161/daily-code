from django.contrib import admin
from .models import FeePlan, PlayerFee, Payment

admin.site.register(FeePlan)
admin.site.register(PlayerFee)
admin.site.register(Payment)
