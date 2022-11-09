from django.contrib.auth.models import User

from rest_framework import serializers

from closet.models import Garment, GarmentWear, Outfit, OutfitWear

class GarmentSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Garment
		fields = '__all__'
		# fields = ('url', 'garment_name', 'owner', 'purchase_date', 'purchase_price')


class  UserSerializer(serializers.HyperlinkedModelSerializer):
	"""docstring for  UserSerializer"""
	class Meta:
		model = User
		# fields = '__all__'
		fields = ['url', 'username', 'email']