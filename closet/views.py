from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
import datetime

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import (
    status,
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
    CreateUserSerializer,
)

from .models import (
    Garment,
    GarmentWear,
    Fashionista
)


## Users and Fashionistas ##
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Fashionista.objects.all()
        else:
            return Fashionista.objects.filter(user=user)


class DashboardViewSet(viewsets.ModelViewSet):
    serializer_class = DashboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Fashionista.objects.all()
        else:
            return Fashionista.objects.filter(user=user)

## Authentication and Registration ##


class UserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


## Garments ##


class GarmentView(viewsets.ModelViewSet):
    serializer_class = GarmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Garment.objects.all()
        else:
            return Garment.objects.filter(owner=user)

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
            return Garment.objects.filter(owner=user)

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
            return GarmentWear.objects.filter(wearer=user)

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
            return GarmentWear.objects.filter(wearer=user)
