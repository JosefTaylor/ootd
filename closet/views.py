from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User

from rest_framework import viewsets, authentication, exceptions

from .serializers import UserSerializer, GarmentSerializer, GarmentWearSerializer
from .models import Garment, GarmentWear

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer


class GarmentView(viewsets.ModelViewSet):
    queryset = Garment.objects.all()
    serializer_class = GarmentSerializer

    def get_queryset(self):
    	user = self.request.user
    	return Garment.objects.filter(owner= user)

class GarmentWearView(viewsets.ModelViewSet):
    queryset = GarmentWear.objects.all()
    serializer_class = GarmentWearSerializer

    def get_queryset(self):
    	user = self.request.user
    	return Garment.objects.filter('owner': user)

