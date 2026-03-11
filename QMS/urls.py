
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls.static import static




urlpatterns = [
    #  Admin
    path('admin/', admin.site.urls),

    #  Login con TokenAuthentication
    path('api/token/', obtain_auth_token, name='api-token'),

    #  Rutas de mi app
    path('api/app/', include('app.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
