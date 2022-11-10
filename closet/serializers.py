from django.contrib.auth.models import User

from rest_framework import serializers

from closet.models import Garment, GarmentWear, Outfit, OutfitWear

class  UserSerializer(serializers.HyperlinkedModelSerializer):
	"""docstring for  UserSerializer"""
	class Meta:
		model = User
		fields = (
			'url',  
			'id',
			'username', 
			'email'
			)


class GarmentSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Garment
		fields = (
			'url', 
			'id',
			'garment_name', 
			'owner', 
			'purchase_date', 
			'purchase_price'
			)


class GarmentWearSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = GarmentWear
		fields = (
			'url',  
			'id',
			'garment', 
			'scan_date', 
			'wearer_name', 
			'owner_name', 
			'garment_name'
			)