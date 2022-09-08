from django.contrib import admin
from .models import File

class FileAdmin(admin.ModelAdmin):
    readonly_fields= ('id','upload_timestamp_date','upload_timestamp_time')
admin.site.register(File,FileAdmin)