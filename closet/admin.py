from django.contrib import admin

from .models import Garment, GarmentWear
# Register your models here.

admin.site.register(Garment)
admin.site.register(GarmentWear)