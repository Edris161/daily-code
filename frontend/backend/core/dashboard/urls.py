from django.urls import path
from .views import DashboardStatsView, SaaSGrowthView

app_name = "dashboard"

urlpatterns = [
    path("stats/", DashboardStatsView.as_view(), name="stats"),
    path("growth/", SaaSGrowthView.as_view(), name="growth"),
]
