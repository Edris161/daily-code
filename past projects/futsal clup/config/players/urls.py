from rest_framework.routers import DefaultRouter
from .views import PlayerViewSet

router = DefaultRouter()
router.register('', PlayerViewSet)

urlpatterns = router.urls
