from rest_framework.routers import DefaultRouter
from schedules.views import ScheduleViewSet

router = DefaultRouter()

router.register(
    r"schedules",
    ScheduleViewSet,
    basename="schedule"
)
