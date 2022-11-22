from django.contrib.auth.models import User

from rest_framework import serializers

from closet.models import (
	Garment, 
	GarmentWear, 
	Outfit, 
	OutfitWear,
	Fashionista
	)


class GarmentMiniSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Garment
		fields = (
			'url',
			'garment_name',
			'owner',
			)


class GarmentSerializer(serializers.HyperlinkedModelSerializer):


	class Meta:
		model = Garment
		fields = (
			'url',
			'garment_name', 
			#'owner', 
			'purchase_date', 
			'purchase_price',
			'deaq_date', 
			'deaq_price',
			'cost_per_wear',
			'is_active',
			)


class GarmentWearSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = GarmentWear
		fields = (
			'url',
			'garment', 
			'scan_date', 
			'wearer',
			'wearer_name', 
			'owner_name', 
			'garment_name'
			)


class  UserSerializer(serializers.HyperlinkedModelSerializer):
#class  UserSerializer(serializers.HyperlinkedModelSerializer):
	"""docstring for  UserSerializer"""

	garments = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='garment-detail')
	garment_wears = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='garmentwear-detail')

	class Meta:
		model = Fashionista
		fields = (
			# 'url',
			'user',
			'username',
			'email',
			'bio',
		    'garments',
			'garment_names',
			'garment_wears',
			'garment_wear_names',
			)