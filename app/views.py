import os
from django.conf import settings
from rest_framework import generics, viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from .serializers import RegisterSerializer, LoginSerializer, ObservationsSerializer
from .models import Observations

User = get_user_model()



@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        #  Crear usuario
        user = serializer.save()

        #  Crear token
        token, created = Token.objects.get_or_create(user=user)

        #  Respuesta correcta
        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        })



@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            #Crear o recuperar token
            token, created = Token.objects.get_or_create(user=user)

            return Response({
                "message": "Login exitoso",
                "token": token.key,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


#  CRUD Observaciones con Token
@method_decorator(csrf_exempt, name='dispatch')
class ObservationsViewset(viewsets.ModelViewSet):
    queryset = Observations.objects.all()
    serializer_class = ObservationsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


# Usuario actual usando Token
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })
    
class ListaArchivosView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        archivos = [
            f for f in os.listdir(settings.MEDIA_ROOT)
            if os.path.isfile(os.path.join(settings.MEDIA_ROOT, f))
        ]
        return Response(archivos)


class ArchivoDetalleView(APIView):
    def get(self, request, nombre):
        ruta = os.path.join(settings.MEDIA_ROOT, nombre)
        with open(ruta, 'r', encoding='utf-8') as f:
            contenido = f.read()
        return Response({'nombre': nombre, 'contenido': contenido})
    
@api_view(['GET'])
def observations_stats(request):
    permission_classes = [AllowAny]
    authentication_classes = []
    observations = Observations.objects.all()

    iniciada = 0
    en_curso = 0
    completada = 0
    cerrada = 0

    for obs in observations:
        if obs.staste == "Iniciada":
            iniciada += 1
        elif obs.staste == "En curso":
            en_curso += 1
        elif obs.staste == "Completada":
            completada += 1
        elif obs.staste == "Cerrada":
            cerrada += 1

    return Response({
        "Iniciada": iniciada,
        "En curso": en_curso,
        "Completada": completada,
        "Cerrada": cerrada,
    })