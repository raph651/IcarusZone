# Generated by Django 4.0 on 2023-02-26 01:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('demo_try', '0005_customer_remove_file_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='auth.user'),
        ),
    ]
