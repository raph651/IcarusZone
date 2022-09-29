from rest_framework import serializers
from .models import File,Customer

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'    #def create(self,validated_data):
    #    return File.objects.create(user=self.context['request'].user,**validated_data)
        