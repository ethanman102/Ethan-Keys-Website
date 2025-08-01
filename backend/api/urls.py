from django.urls import include, path
from .api_handling.project_api import ProjectViewSet
from rest_framework.routers import DefaultRouter
from .api_handling.blog_api import BlogViewSet
from .api_handling.email_api import EmailView

app_name = 'api'
router = DefaultRouter()
router.register(r'projects',ProjectViewSet,basename='projects')
router.register(r'blogs',BlogViewSet,basename='blogs')

urlpatterns = [
    path('',include(router.urls)),
    path('email/', EmailView.as_view(), name="email")
]