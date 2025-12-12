from django.urls import path, include
from rest_framework import routers
from .views import RegisterView, LoginView, ObservationsViewset, CurrentUserView

router = routers.DefaultRouter()
router.register(r'observations', ObservationsViewset, basename='observations')

urlpatterns = [
    path('Register/', RegisterView.as_view(), name='register'),
    path('Login/', LoginView.as_view(), name='login'),
    path('user/', CurrentUserView.as_view(), name='current-user'),
    path('', include(router.urls)),
]
