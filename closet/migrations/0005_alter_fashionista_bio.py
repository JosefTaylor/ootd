# Generated by Django 3.2.16 on 2022-11-21 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('closet', '0004_alter_fashionista_bio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fashionista',
            name='bio',
            field=models.CharField(max_length=500),
        ),
    ]
