from django.urls import path
from .views import SaaSAppListCreateView, SaaSAppDetailView

app_name = "billing"

urlpatterns = [
    path("apps/", SaaSAppListCreateView.as_view(), name="saasapp_list_create"),
    path("apps/<int:pk>/", SaaSAppDetailView.as_view(), name="saasapp_detail"),
]
