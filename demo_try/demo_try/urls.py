from xml.dom.minidom import Document
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from . import views, settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name ='home'),
    path('files/',views.files, name='files'),
    path('file/<int:file_id>/', views.file,name ='file'),
    path('idx/',views.idx,name='idx'),
    path('files/edit/<int:file_id>/',views.edit, name='edit'),
    path('files/delete/<int:file_id>/',views.delete,name='delete'),
    path('files/upload/',views.upload, name='upload'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)