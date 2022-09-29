from django.db import models
from django.contrib.auth.models import User

class File(models.Model):
    #user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=1024)
    file_type = models.CharField(max_length=10)
    upload_timestamp_date= models.DateField(auto_now_add=True,null=True)
    upload_timestamp_time= models.TimeField(auto_now_add=True,null=True)
    file = models.FileField(null=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=200)
    industry = models.CharField(max_length=200)