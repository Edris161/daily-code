from django.urls import path
from .views import (
    DepartmentSpendingReport,
    CostVsUsageReport,
    LicenseUtilizationReport,
)

app_name = "reports"

urlpatterns = [
    path("department-spending/", DepartmentSpendingReport.as_view(), name="department_spending"),
    path("cost-vs-usage/", CostVsUsageReport.as_view(), name="cost_vs_usage"),
    path("license-utilization/", LicenseUtilizationReport.as_view(), name="license_utilization"),
]
