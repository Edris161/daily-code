from django.db import router
from fees.views import FeeViewSet

router.register(r"fees", FeeViewSet)