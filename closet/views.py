from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
import datetime

from rest_framework import (
    generics,
    viewsets, 
    authentication, 
    exceptions, 
    permissions,
    mixins
    )

from .serializers import (
    UserSerializer, 
    GarmentSerializer, 
    GarmentWearSerializer,
    DashboardSerializer,
    )

from .models import (
    Garment, 
    GarmentWear,
    Fashionista
    )
    

## Users and Fashionistas ##
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Fashionista.objects.all()
        else:
            return Fashionista.objects.filter(user= user)

class DashboardViewSet(viewsets.ModelViewSet):
    serializer_class = DashboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Fashionista.objects.all()
        else:
            return Fashionista.objects.filter(user= user)


## Garments ##
class GarmentView(viewsets.ModelViewSet):
    serializer_class = GarmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Garment.objects.all()
        else:
            return Garment.objects.filter(owner= user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GarmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = Garment
    serializer_class = GarmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Garment.objects.all()
        else:
            return Garment.objects.filter(owner= user)

## Garment Wears ##
class GarmentWearView(viewsets.ModelViewSet):
    model = GarmentWear
    serializer_class = GarmentWearSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return GarmentWear.objects.all()
        else:
            return GarmentWear.objects.filter(wearer= user)

    def perform_create(self, serializer):
        serializer.save(wearer=self.request.user)


class GarmentWearDeleteView(generics.DestroyAPIView):
    model = GarmentWear
    serializer_class = GarmentWearSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return GarmentWear.objects.all()
        else:
            return GarmentWear.objects.filter(wearer= user)