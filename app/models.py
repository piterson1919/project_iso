from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    CARGO = [
        ('Almacen', 'Almacen'),
        ('Gestion de calidad', 'Gestion de calidad'),
        ('Control de calidad', 'Control de calidad'),
        ('Direccion', 'Direccion'),
        ('Gerencia de productos', 'Gerencia de productos'),
        ('Informatica y Telecomunicaciones', 'Informatica y Telecomunicaciones'),
        ('RRHH', 'RRHH'),
        ('Seguridad y Salud Laboral', 'Seguridad y Salud Laboral'),
        ('Servicios generales', 'Servicios generales'),
        ('Ventas y Distribucion', 'Ventas y Distribucion'),
    ]

    cargo = models.CharField(max_length=80, choices=CARGO)

class Observations(models.Model):

    title = models.CharField(max_length=30)
    TYPE =  (
       [ ('No conformidad','No conformidad'),('Observacion','Observacion'),('Oportunidad de mejora','Oportunidad de mejora')]
    )
    type = models.CharField(max_length=80, choices = TYPE, default= 'observaciones')

    STATE = (
       [ ('Iniciada','Iniciada'),('En curso','En curso'),('Completada','Completada'),('Cerrada','Cerrada')]
    )

    STATE = (
       [ ('Iniciada','Iniciada'),('En curso','En curso'),('Completada','Completada'),('Cerrada','Cerrada')]
    )
    staste = models.CharField(max_length=50, choices=STATE, default= 'Iniciada')

    STANDART_ISO = (

        [('ISO 9001: 2015','ISO 9001: 2015')]

    )

    observaciones = models.TextField(max_length=200)
    
    standart = models.CharField(max_length=100, choices=STANDART_ISO ,default= 'Iniciada')
    





