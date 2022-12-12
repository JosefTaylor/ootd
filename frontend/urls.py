# djsr/frontend/urls.py
from django.urls import path, include, re_path
# from django.conf.urls import url # this was deprecated in favor of re_path
from .views import index_view

urlpatterns = [
    path('', index_view), # for the empty url
    re_path(r'^.*/$', index_view), # for all other urls
]