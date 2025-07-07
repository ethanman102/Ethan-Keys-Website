from django.urls import include, path
from .api_handling.project_api import ProjectViewSet
from rest_framework.routers import DefaultRouter

app_name = 'api'
router = DefaultRouter()
router.register(r'projects',ProjectViewSet,basename='projects')

urlpatterns = [
    path('',include(router.urls))
]