from django.urls import path
from .views import (
    SaaSAppListCreateView,
    SaaSAppDetailView,
)

app_name = "saas"

urlpatterns = [
    path("", SaaSAppListCreateView.as_view(), name="saas-list-create"),
    path("<int:pk>/", SaaSAppDetailView.as_view(), name="saas-detail"),
]
