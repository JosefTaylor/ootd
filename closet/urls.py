"""ootd URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.models import User
from django.views.generic import RedirectView

from rest_framework import routers, serializers, viewsets
from rest_framework_simplejwt import views as jwt_views

from closet import views

router = routers.DefaultRouter()

router.register(r'users', views.UserViewSet, 'user')
router.register(r'garments', views.GarmentView, 'garment')
router.register(r'garmentwears', views.GarmentWearView, 'garmentwear')
router.register(r'dashboard', views.DashboardViewSet, 'dashboard')

urlpatterns = [
    path('', include(router.urls)),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('garments/<int:pk>/',
         views.GarmentDetailView.as_view(),
         name='garment-detail'),
    path('garmentweardelete/<int:pk>/',
         views.GarmentWearDeleteView.as_view(),
         name='garmentweardelete'),
    # TODO: token delete, register, etc.
]
