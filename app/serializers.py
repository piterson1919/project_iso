from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework.response import Response 
from .models import Observations

# modelo de user custom
User = get_user_model()

# serializer de registro que incluye el password2  para validadar que la contrasenia sea la que desea  
#posee la fase de validar el email y creacion de el usuario si todo es valido

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2','cargo')

#valida el email si hay un email en la base de datos. si hay email da error por ya estar registrado, si no la guarda con la cuenta

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email ya está registrado.")
        return value


#valida si las dos contrasenas son iguales para posteriormente guardarla
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return attrs

#Crea al usuario en caso de que todo alla estado correcto y quita el password2 para que no aparesca en la base de datos
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

#crea el json de el login
class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    # se coloca de esta forma para que par que el password no se pueda mostra en el json 
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

#valida que el password y el username existan en la base de datos, si no existe entonces no se podra logear
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError("La contraseña o el usuario no son válidos")

        data['user'] = user
        return data
    
class ObservationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observations
        fields = '__all__'

class GetUser(serializers.Serializer):
    class Meta:
        model = User
        fields = '__all__'





