# Generated by Django 4.1.4 on 2023-02-03 15:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("closet", "0012_alter_outfitwear_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="garmentwear",
            name="date",
            field=models.DateField(default=datetime.date.today),
        ),
    ]