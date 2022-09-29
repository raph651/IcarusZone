from django.contrib import admin
from .models import File,Customer

class FileAdmin(admin.ModelAdmin):
    readonly_fields= ('id','upload_timestamp_date','upload_timestamp_time')
admin.site.register(File,FileAdmin)

admin.site.register(Customer)
