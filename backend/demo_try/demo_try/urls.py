from xml.dom.minidom import Document
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from . import views, settings

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name ='home'),
    path('api/files/', views.files, name='files'),
    path('api/files/<int:file_id>/', views.file, name='file'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/customers/',views.customers,name='customers'),
    path('api/customer/<int:customer_id>/', views.customer, name='customer'),

    #path('files/',views.files, name='files'),
    #path('file/<int:file_id>/', views.file,name ='file'),
    #path('idx/',views.idx,name='idx'),
    #path('files/edit/<int:file_id>/',views.edit, name='edit'),
    #path('files/delete/<int:file_id>/',views.delete,name='delete'),
    #path('files/upload/',views.upload, name='upload'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns = format_suffix_patterns(urlpatterns)