from django.contrib import admin
from  about_us.models import about_us, history, team, stuff

admin.site.register(about_us)
admin.site.register(history)
admin.site.register(team)
admin.site.register(stuff)