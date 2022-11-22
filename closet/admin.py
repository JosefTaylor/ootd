from django.contrib import admin

from .models import Garment, GarmentWear, Fashionista
# Register your models here.

admin.site.register(Garment)
admin.site.register(GarmentWear)
admin.site.register(Fashionista)