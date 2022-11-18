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
    UserWardrobeSerializer,
    )
from .models import Garment, GarmentWear

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return [self.request.user]
        
class GarmentView(viewsets.ModelViewSet):
    serializer_class = GarmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Garment.objects.filter(owner= user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.url)

class GarmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = Garment
    serializer_class = GarmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Garment.objects.filter(owner= user)

class GarmentWearView(viewsets.ModelViewSet):
    serializer_class = GarmentWearSerializer

    def get_queryset(self):
        user = self.request.user
        return GarmentWear.objects.filter(wearer= user)

    def perform_create(self, serializer):
        serializer.save(wearer=self.request.user)


class UserWardrobeView(viewsets.ModelViewSet):
    serializer_class = UserWardrobeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user