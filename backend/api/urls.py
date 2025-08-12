from django.urls import include, path
from .api_handling.project_api import ProjectViewSet
from rest_framework.routers import DefaultRouter
from .api_handling.blog_api import BlogViewSet
from .api_handling.email_api import EmailView
from .api_handling.jwt_api import LoginView, LogoutView, HttpCookieRefreshView, ProvideAuthenticationStateView

app_name = 'api'
router = DefaultRouter()
router.register(r'projects',ProjectViewSet,basename='projects')
router.register(r'blogs',BlogViewSet,basename='blogs')

urlpatterns = [
    path('login/',LoginView.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('refresh/',HttpCookieRefreshView.as_view(),name='refresh'),
    path('authenticated/',ProvideAuthenticationStateView.as_view(),name='authenticated'),
    path('',include(router.urls)),
    path('email/', EmailView.as_view(), name="email")
]