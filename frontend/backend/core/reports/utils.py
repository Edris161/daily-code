from billing.models import SaaSApp
from django.db.models import Sum, Count

def department_spending():
    return (
        SaaSApp.objects
        .values("department__name")
        .annotate(total_spend=Sum("annual_cost"))
        .order_by("-total_spend")
    )


def cost_vs_usage():
    return (
        SaaSApp.objects
        .values("name")
        .annotate(
            total_cost=Sum("annual_cost"),
            total_users=Count("assigned_users")
        )
    )


def license_utilization():
    return (
        SaaSApp.objects
        .values("name", "license_count")
        .annotate(used=Count("assigned_users"))
    )
