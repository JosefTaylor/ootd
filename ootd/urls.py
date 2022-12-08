from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include('closet.urls')),
    path("", include('frontend.urls')), # "" is at the bottom so that React can manage all sub-urls, and we still have the Django views.
]
