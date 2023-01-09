import datetime
import math

from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

User = get_user_model()
# Create your models here.


class Fashionista(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=500)
    # TODO three_words = models.ListField()
    # TODO picture = models.ImageField(upload_to='fashionistas/')

    def __str__(self):
        return self.user.username

    def username(self):
        return self.user.username

    def email(self):
        return self.user.email

    def garments(self):
        return Garment.objects.filter(owner=self.user)

    def garment_wears(self):
        return GarmentWear.objects.filter(wearer=self.user)


class Garment(models.Model):
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    purchase_date = models.DateField(null=True)
    purchase_price = models.FloatField(null=True, default=0)
    deaq_date = models.DateField(blank=True, null=True)
    deaq_price = models.FloatField(blank=True, null=True, default=0)
    # TODO image = models.ImageField(upload_to='garments/%Y/%m/%d')

    def __str__(self):
        return self.name

    def clean(self):
        if self.purchase_date:
            # Make sure purchase_date is in the past
            now = timezone.now().date()
            if self.purchase_date > now:
                raise ValidationError(_("Purchase Date must be in the past."))
            # Set the pub_date for published items if it hasn't been set already.
            if self.purchase_date == None:
                self.purchase_date = datetime.date.today()
        # TODO: check other stuff as well

    def cost_per_wear(self):
        purchase_price = self.purchase_price if self.purchase_price else 0
        deaq_price = self.deaq_price if self.deaq_price else 0
        cost = purchase_price - deaq_price
        num_wears = max(1, len(GarmentWear.objects.filter(garment=self)))
        return cost / num_wears

    def num_wears(self):
        return len(GarmentWear.objects.filter(garment=self))

    def is_active(self):
        return not self.deaq_date or self.deaq_date > datetime.date.today()


class GarmentWear(models.Model):
    garment = models.ForeignKey(Garment, on_delete=models.CASCADE)
    scan_date = models.DateTimeField()
    wearer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    # wearer - is the creator of the table row stored? if so, no need to store

    def __str__(self):
        if self.wearer == self.garment.owner:
            return f"{self.wearer.username} wore their " + f"{self.garment.name}"
        else:
            return (
                f"{self.wearer.username} wore "
                + f"{self.garment.owner.username}'s "
                + f"{self.garment.name}"
            )

    def wearer_name(self):
        return self.wearer.username

    def owner_name(self):
        return self.garment.owner.username

    def garment_name(self):
        return self.garment.name

    def garment_id(self):
        return self.garment.id

    def cost(self):
        return self.garment.cost_per_wear()


class Outfit(models.Model):
    name = models.CharField(max_length=200)
    garments = models.ManyToManyField(Garment, symmetrical=False)

    # style
    # dress_code
    # season
    # list of garments?

    def __str__(self):
        return self.name


class OutfitWear(models.Model):
    outfit = models.ForeignKey(Outfit, on_delete=models.CASCADE)
    scan_date = models.DateTimeField()
    wearer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


# class OutfitGarment(models.Model):
#    garment = models.ForeignKey(Garment, on_delete=models.CASCADE)
#    outfit = models.ForeignKey(Outfit, on_delete=models.CASCADE)
#
#    def __str__(self):
#        return f"{self.garment} as part of {self.outfit}"
