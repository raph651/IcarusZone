from django.contrib import admin
from .models import File

class FileAdmin(admin.ModelAdmin):
    readonly_fields= ('id','upload_timestamp_date','upload_timestamp_time')
    #readonly_fields= ('id','upload_timestamp')
admin.site.register(File,FileAdmin)