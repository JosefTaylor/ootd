from django.contrib.auth.models import User

from rest_framework import serializers

from closet.models import Garment, GarmentWear, Outfit, OutfitWear, Fashionista

from taggit.serializers import TagListSerializerField, TaggitSerializer


class GarmentSerializer(TaggitSerializer, serializers.HyperlinkedModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = Garment
        fields = (
            "url",
            "id",
            "name",
            "owner",
            "purchase_date",
            "purchase_price",
            "deaq_date",
            "deaq_price",
            "cost_per_wear",
            "num_wears",
            "is_active",
            "tags",
        )


class GarmentWearSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GarmentWear
        fields = (
            "url",
            "id",
            "garment",
            "date",
            "wearer",
            "wearer_name",
            "owner_name",
            "garment_name",
            "garment_id",
            "cost",
        )


class FashionistaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Fashionista
        fields = (
            "user",
            "bio",
        )


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True, required=True)
    fashionista = FashionistaSerializer(required=False)

    class Meta:
        model = User
        fields = ("email", "username", "password", "fashionista")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User.objects.create(
            **validated_data
        )  # as long as the fields are the same, we can just use this
        if password is not None:
            user.set_password(password)
            print(f"setting password: {password}")
            user.save()
        Fashionista.objects.create(user=user, bio="")
        return user

    # Grabbed this from dj-rest-auth docs, not using yet, and not tested.
    def update(self, instance, validated_data):
        fashionista_serializer = self.fields["fashionista"]
        fashionista_instance = instance.fashionista
        fashionista_data = validated_data.pop("fashionista", {})

        fashionista_serializer.update(fashionista_instance, fashionista_data)

        instance = super().update(instance, validated_data)
        return instance

    def save(self):
        return self.create(self.validated_data)


class FashionistaProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Fashionista
        fields = (
            "user",
            "bio",
        )


class DashboardSerializer(serializers.HyperlinkedModelSerializer):

    garments = GarmentSerializer(many=True)
    garment_wears = GarmentWearSerializer(many=True)

    class Meta:
        model = Fashionista
        fields = (
            "user",
            "username",
            "garments",
            "garment_wears",
        )
