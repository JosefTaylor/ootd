from django.urls import path

from . import views

app_name = 'closet'
urlpatterns = [
    # ex: /closet/
    path('', views.index, name='index'),
    path('wardrobe/', views.WardrobeView.as_view(), name='wardrobe'),
    # ex: /closet/garment/5
    path('garment/<int:pk>/', views.GarmentView.as_view(), name='garment_detail'),
    path('garment/<int:pk>/update/', views.GarmentUpdateView.as_view(), name='garment_update'),
    path('garment/<int:pk>/delete/', views.GarmentDeleteView.as_view(), name='garment_delete'),
    path('garment/new/', views.GarmentCreateView.as_view(), name='new_garment')
]
