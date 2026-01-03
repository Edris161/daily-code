from rest_framework.routers import DefaultRouter
from .views import TrainingViewSet

router = DefaultRouter()
router.register('', TrainingViewSet)

urlpatterns = router.urls
