from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import date,timedelta

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
    def default_end_date():
        return date.today() + timedelta(days=30)

    title = models.CharField(max_length=100)
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

        [('ISO 9001','ISO 9001'),('Norma Covenin 39','Norma Covenin 39'),('PDVSA EM 36-01/01','PDVSA EM 36-01/01'),('Procedimiento','Procedimiento')]

    )

    observaciones = models.TextField(blank=True)

    standart = models.CharField(max_length=100, choices=STANDART_ISO ,default= 'Iniciada')    

    start_date = models.DateField(default=date.today)
    end_date = models.DateField(default=default_end_date)

    DEPARTAMENT= [
        ('Almacen FOOT', 'Almacen FOOT'),
        ('Almacen FISSA', 'Almacen FISSA'),
        ('Gestion de calidad', 'Gestion de calidad'),
        ('Control de calidad', 'Control de calidad'),
        ('Direccion', 'Direccion'),
        ('Gerencia de productos', 'Gerencia de productos'),
        ('Informatica y Telecomunicaciones', 'Informatica y Telecomunicaciones'),
        ('RRHH', 'RRHH'),
        ('Seguridad y Salud Laboral', 'Seguridad y Salud Laboral'),
        ('Servicios generales', 'Servicios generales'),
        ('Ventas y Distribucion', 'Ventas y Distribucion'),
        ('Compras', 'Compras'),
        ('Logistica y Transporte', 'Logistica y Transporte'),
        ('Produccion', 'Produccion'),
        ('Ventas', 'Ventas'),
        ('Mantenimiento Industrial', 'Mantenimiento Industrial'),
    ]

    departament = models.CharField(max_length=80,choices=DEPARTAMENT, default='ingrese un departamento')

    close_note = models.TextField(blank = True)

    ORIGIN = (
        [('Auditoria interna','Auditoria interna'),('Auditoria externa','auditoria externa'),('producto','producto')]
    )

    origin = models.CharField(max_length=100, choices=ORIGIN ,default= 'Elegir origen')

    file_path = models.CharField(
    max_length=400,
    blank=True,
    null=True,
    help_text="Ruta o URL del archivo (local, compartido o Google Drive)"
    
    )

    ACTIONS = (
        [('Accion correctiva','Accion correctiva'),('Accion preventiva','Accion preventiva'),('Correccion','Correccion')]
    )

    actions = models.CharField(choices = ACTIONS,default = 'Elegir una accion')
