from django.contrib.auth.models import User

from rest_framework import serializers

from closet.models import (
	Garment, 
	GarmentWear, 
	Outfit, 
	OutfitWear,
	Fashionista
	)


class GarmentSerializer(serializers.HyperlinkedModelSerializer):


	class Meta:
		model = Garment
		fields = (
			'url',
			'id',
			'name', 
			'owner', 
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
			'id',
			'garment', 
			'scan_date', 
			'wearer',
			'wearer_name', 
			'owner_name', 
			'garment_name',
			'garment_id',
			)


class  UserSerializer(serializers.HyperlinkedModelSerializer):
#class  UserSerializer(serializers.HyperlinkedModelSerializer):
	"""docstring for  UserSerializer"""

	class Meta:
		model = Fashionista
		fields = (
			'user',
			'username',
			'email',
			'bio',
			)


class  DashboardSerializer(serializers.HyperlinkedModelSerializer):
#class  UserSerializer(serializers.HyperlinkedModelSerializer):
	"""docstring for  UserSerializer"""

	# garments = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='garment-detail')
	# garment_wears = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='garmentwear-detail')
	garments = GarmentSerializer(many=True)
	garment_wears = GarmentWearSerializer(many=True)

	class Meta:
		model = Fashionista
		fields = (
			'user',
			'username',
		    'garments',
			'garment_wears',
			)