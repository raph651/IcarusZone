# Generated by Django 4.0 on 2022-09-08 18:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('demo_try', '0003_file_file_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='auth.user'),
        ),
    ]
