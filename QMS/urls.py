from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # ✅ Admin
    path('admin/', admin.site.urls),

    # ✅ Login con TokenAuthentication
    path('api/token/', obtain_auth_token, name='api-token'),

    # ✅ Rutas de tu app (manteniendo tu estilo con / al inicio)
    path('api/app/', include('app.urls')),
]
